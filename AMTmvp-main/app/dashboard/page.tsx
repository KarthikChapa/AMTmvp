import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AthleteStats } from "@/components/dashboard/athlete-stats"
import { RecentActivities } from "@/components/dashboard/recent-activities"
import { UpcomingEvents } from "@/components/dashboard/upcoming-events"
import { InjuryRiskChart } from "@/components/dashboard/injury-risk-chart"
import { PerformanceMetrics } from "@/components/dashboard/performance-metrics"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"
import { ShieldCheck, Sparkles, Users, Camera } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 w-full">
      <DashboardHeader />

      <Tabs defaultValue="overview" className="space-y-4 w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="career">Career Planning</TabsTrigger>
          <TabsTrigger value="training">Training</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <AthleteStats />
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Performance Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <PerformanceMetrics />
              </CardContent>
            </Card>

            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Injury Risk Assessment</CardTitle>
                <CardDescription>Based on recent training load and biometrics</CardDescription>
              </CardHeader>
              <CardContent>
                <InjuryRiskChart />
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
                <CardDescription>Your latest training sessions and assessments</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentActivities />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Scheduled training, matches and appointments</CardDescription>
              </CardHeader>
              <CardContent>
                <UpcomingEvents />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Detailed Performance Analytics</CardTitle>
              <CardDescription>Comprehensive view of your performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Detailed performance metrics content will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="career" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Career Longevity Predictor</CardTitle>
              <CardDescription>AI-powered insights for your sports career</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h3 className="font-medium mb-2">Career Blind Spots Analysis</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Our AI has analyzed your career trajectory and identified key areas to focus on for maximum career longevity.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex flex-col items-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <div className="mb-2 text-blue-600">
                      <ShieldCheck className="h-8 w-8" />
                    </div>
                    <h4 className="font-medium text-center">Injury Prevention</h4>
                    <p className="text-xs text-center text-muted-foreground">Risk reduced by 40%</p>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <div className="mb-2 text-blue-600">
                      <Sparkles className="h-8 w-8" />
                    </div>
                    <h4 className="font-medium text-center">Performance Optimization</h4>
                    <p className="text-xs text-center text-muted-foreground">5 years additional peak</p>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <div className="mb-2 text-blue-600">
                      <Users className="h-8 w-8" />
                    </div>
                    <h4 className="font-medium text-center">Post-Career Options</h4>
                    <p className="text-xs text-center text-muted-foreground">3 high-match careers</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <Button asChild>
                  <Link href="/career-predictor">Full Career Analysis</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="training" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Motion Coach</CardTitle>
              <CardDescription>Camera-based biomechanics analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <Camera className="h-6 w-6 text-blue-600" />
                    <h3 className="font-medium">Preventable Injuries Detection</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Our motion tracking technology analyzes your movements in real-time to identify potential injury risks and improve technique.
                  </p>
                  <div className="flex justify-end">
                    <Button asChild>
                      <Link href="/video-exercise">Start Motion Analysis</Link>
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Recent Video Exercises</h3>
                    <div className="space-y-2">
                      {[
                        { name: "Squat Form Analysis", date: "June 12, 2023", score: 92 },
                        { name: "Deadlift Technique", date: "June 10, 2023", score: 85 },
                        { name: "Bench Press Form", date: "June 5, 2023", score: 88 },
                      ].map((exercise, index) => (
                        <div key={index} className="flex items-center justify-between border rounded-lg p-3">
                          <div>
                            <div className="font-medium">{exercise.name}</div>
                            <div className="text-sm text-muted-foreground">{exercise.date}</div>
                          </div>
                          <div className="bg-green-100 dark:bg-green-900 px-2 py-1 rounded text-green-800 dark:text-green-100">
                            {exercise.score}%
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-end">
                      <Button variant="outline" asChild>
                        <Link href="/video-exercise">Go to Video Exercises</Link>
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Training Plans</h3>
                    <div className="space-y-2">
                      {[
                        { name: "Strength Building", progress: 65, sessions: 4 },
                        { name: "Endurance Training", progress: 30, sessions: 2 },
                        { name: "Recovery Protocol", progress: 90, sessions: 6 },
                      ].map((plan, index) => (
                        <div key={index} className="border rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <div className="font-medium">{plan.name}</div>
                            <div className="text-sm text-muted-foreground">{plan.sessions} sessions</div>
                          </div>
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>Progress</span>
                              <span>{plan.progress}%</span>
                            </div>
                            <Progress value={plan.progress} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

