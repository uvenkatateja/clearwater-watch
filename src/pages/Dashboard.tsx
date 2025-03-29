
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WaterQualityWidget from '@/components/WaterQualityWidget';
import WaterQualityChart from '@/components/WaterQualityChart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useWaterQuality } from '@/hooks/use-water-quality';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/use-toast';

const Dashboard = () => {
  const { data, loading, error } = useWaterQuality();
  const { toast } = useToast();
  
  // Check if the user is in demo mode
  useEffect(() => {
    const isDemoUser = sessionStorage.getItem('demoLogin') === 'true';
    if (isDemoUser) {
      console.log("User is in demo mode, displaying water quality data");
    }
  }, []);
  
  // Notify user if there's a data loading error
  useEffect(() => {
    if (error) {
      console.error("Dashboard data loading error:", error);
      toast({
        title: "Data loading error",
        description: "There was a problem loading the water quality data. Please try again later.",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Water Quality Dashboard</h1>
        
        <div className="grid grid-cols-1 gap-6">
          {/* Water Quality Widget */}
          <WaterQualityWidget />
          
          {/* Charts Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {loading ? (
              <>
                <Skeleton className="h-[400px] w-full rounded-lg" />
                <Skeleton className="h-[400px] w-full rounded-lg" />
                <Skeleton className="h-[400px] w-full rounded-lg" />
              </>
            ) : error ? (
              <Card>
                <CardHeader>
                  <CardTitle>Error</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Failed to load chart data. Please try again later.</p>
                </CardContent>
              </Card>
            ) : data ? (
              <>
                <WaterQualityChart
                  title="pH Level History"
                  parameter="pH"
                  currentValue={data.pH}
                  unit=""
                  color="#0ea5e9"
                />
                
                <WaterQualityChart
                  title="TDS History"
                  parameter="TDS"
                  currentValue={data.TDS}
                  unit=" ppm"
                  color="#10b981"
                />
                
                <WaterQualityChart
                  title="Temperature History"
                  parameter="Temperature"
                  currentValue={data.Temperature}
                  unit="°C"
                  color="#f59e0b"
                />
              </>
            ) : null}
          </div>
          
          {/* Recommendations Section */}
          <Card>
            <CardHeader>
              <CardTitle>Recommendations</CardTitle>
              <CardDescription>Based on current water quality parameters</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <>
                  <Skeleton className="h-[20px] w-3/4 rounded-lg mb-2" />
                  <Skeleton className="h-[20px] w-5/6 rounded-lg mb-2" />
                  <Skeleton className="h-[20px] w-2/3 rounded-lg" />
                </>
              ) : error ? (
                <p>Failed to load recommendations. Please try again later.</p>
              ) : data ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium">pH Level ({data.pH})</h3>
                    <p className="text-sm text-muted-foreground">
                      {data.pH < 6.5 ? (
                        "The pH level is too acidic. Consider adding alkaline additives to neutralize the water."
                      ) : data.pH > 8.5 ? (
                        "The pH level is too alkaline. Consider adding acid neutralizers to balance the water."
                      ) : (
                        "The pH level is within the optimal range. Continue to monitor for any changes."
                      )}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium">TDS ({data.TDS} ppm)</h3>
                    <p className="text-sm text-muted-foreground">
                      {data.TDS < 300 ? (
                        "The TDS level is excellent. Continue to monitor for any significant changes."
                      ) : data.TDS < 600 ? (
                        "The TDS level is acceptable but moderate. Consider additional filtration if the level increases."
                      ) : (
                        "The TDS level is high. Water filtration is recommended to reduce the dissolved solids."
                      )}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium">Temperature ({data.Temperature}°C)</h3>
                    <p className="text-sm text-muted-foreground">
                      {data.Temperature < 10 ? (
                        "The water temperature is low. Consider raising the temperature for optimal ecosystem health."
                      ) : data.Temperature > 25 ? (
                        "The water temperature is high. Consider methods to cool the water to prevent stress on aquatic life."
                      ) : (
                        "The water temperature is within the optimal range. Continue to monitor for any changes."
                      )}
                    </p>
                  </div>
                </div>
              ) : null}
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
