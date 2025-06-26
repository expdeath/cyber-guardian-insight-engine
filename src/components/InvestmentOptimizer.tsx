
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Calculator, Target, TrendingUp, AlertCircle, CheckCircle, Zap } from 'lucide-react';

const InvestmentOptimizer = () => {
  const [budget, setBudget] = useState(1000000);
  const [riskTolerance, setRiskTolerance] = useState([50]);
  const [optimizing, setOptimizing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const securityCategories = [
    { name: 'Network Security', current: 250000, recommended: 320000, roi: 2.4, risk: 'Medium' },
    { name: 'Endpoint Protection', current: 180000, recommended: 220000, roi: 3.1, risk: 'High' },
    { name: 'Identity Management', current: 150000, recommended: 200000, roi: 2.8, risk: 'Medium' },
    { name: 'Security Monitoring', current: 120000, recommended: 160000, roi: 3.5, risk: 'Low' },
    { name: 'Compliance & Audit', current: 80000, recommended: 100000, roi: 1.9, risk: 'Low' },
  ];

  const radarData = [
    { subject: 'Prevention', current: 65, optimized: 85 },
    { subject: 'Detection', current: 72, optimized: 88 },
    { subject: 'Response', current: 58, optimized: 78 },
    { subject: 'Recovery', current: 61, optimized: 82 },
    { subject: 'Compliance', current: 75, optimized: 90 },
  ];

  const handleOptimize = async () => {
    setOptimizing(true);
    // Simulate optimization algorithm
    await new Promise(resolve => setTimeout(resolve, 3000));
    setOptimizing(false);
    setShowResults(true);
  };

  const totalRecommended = securityCategories.reduce((sum, cat) => sum + cat.recommended, 0);
  const budgetUtilization = (totalRecommended / budget) * 100;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Investment Optimizer</h2>
          <p className="text-slate-400">Optimize your cybersecurity portfolio for maximum protection</p>
        </div>
        <Badge className="bg-purple-600 text-white">
          <Zap className="h-3 w-3 mr-1" />
          AI-Powered
        </Badge>
      </div>

      <Tabs defaultValue="configure" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-slate-800/50">
          <TabsTrigger value="configure">Configure</TabsTrigger>
          <TabsTrigger value="optimize">Optimize</TabsTrigger>
          <TabsTrigger value="results" disabled={!showResults}>Results</TabsTrigger>
        </TabsList>

        <TabsContent value="configure" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Budget Configuration */}
            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Budget Parameters</CardTitle>
                <CardDescription className="text-slate-400">
                  Set your cybersecurity investment constraints
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="budget" className="text-slate-300">Total Budget ($)</Label>
                  <Input
                    id="budget"
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>

                <div className="space-y-4">
                  <Label className="text-slate-300">Risk Tolerance: {riskTolerance[0]}%</Label>
                  <Slider
                    value={riskTolerance}
                    onValueChange={setRiskTolerance}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Conservative</span>
                    <span>Balanced</span>
                    <span>Aggressive</span>
                  </div>
                </div>

                <div className="p-4 bg-slate-700/50 rounded-lg">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Budget Utilization</span>
                    <span className="text-white font-medium">{budgetUtilization.toFixed(1)}%</span>
                  </div>
                  <Progress value={budgetUtilization} className="mt-2" />
                </div>
              </CardContent>
            </Card>

            {/* Current Allocation */}
            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Current Allocation</CardTitle>
                <CardDescription className="text-slate-400">
                  Your existing cybersecurity investments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={securityCategories} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis type="number" stroke="#9CA3AF" />
                    <YAxis dataKey="name" type="category" stroke="#9CA3AF" width={120} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px'
                      }}
                      formatter={(value) => [`$${value.toLocaleString()}`, 'Investment']}
                    />
                    <Bar dataKey="current" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="optimize" className="space-y-6">
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Calculator className="h-5 w-5 mr-2" />
                Optimization Engine
              </CardTitle>
              <CardDescription className="text-slate-400">
                Generate optimal investment recommendations using advanced algorithms
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-700/50 rounded-lg text-center">
                  <Target className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                  <h3 className="font-medium text-white">Linear Programming</h3>
                  <p className="text-sm text-slate-400 mt-1">Resource allocation optimization</p>
                </div>
                <div className="p-4 bg-slate-700/50 rounded-lg text-center">
                  <TrendingUp className="h-8 w-8 text-green-400 mx-auto mb-2" />
                  <h3 className="font-medium text-white">ROI Maximization</h3>
                  <p className="text-sm text-slate-400 mt-1">Return on investment analysis</p>
                </div>
                <div className="p-4 bg-slate-700/50 rounded-lg text-center">
                  <AlertCircle className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                  <h3 className="font-medium text-white">Risk Modeling</h3>
                  <p className="text-sm text-slate-400 mt-1">Bayesian threat analysis</p>
                </div>
              </div>

              <div className="text-center">
                <Button 
                  onClick={handleOptimize}
                  disabled={optimizing}
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 px-8"
                >
                  {optimizing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Optimizing Portfolio...
                    </>
                  ) : (
                    <>
                      <Calculator className="h-4 w-4 mr-2" />
                      Run Optimization
                    </>
                  )}
                </Button>
              </div>

              {optimizing && (
                <div className="space-y-4">
                  <div className="text-center text-slate-400">
                    Running advanced optimization algorithms...
                  </div>
                  <div className="space-y-2">
                    <Progress value={33} className="h-2" />
                    <div className="text-sm text-slate-500 text-center">
                      Analyzing threat landscape and current investments
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Optimization Results */}
            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                  Recommended Allocation
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Optimized investment distribution
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {securityCategories.map((category, index) => (
                    <div key={index} className="p-4 bg-slate-700/30 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-white">{category.name}</h4>
                        <Badge 
                          variant={category.risk === 'High' ? 'destructive' : category.risk === 'Medium' ? 'secondary' : 'default'}
                        >
                          {category.risk} Risk
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-slate-400">Current:</span>
                          <span className="text-white ml-2">${category.current.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-slate-400">Recommended:</span>
                          <span className="text-green-400 ml-2">${category.recommended.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-slate-400">ROI:</span>
                          <span className="text-blue-400 ml-2">{category.roi}x</span>
                        </div>
                        <div>
                          <span className="text-slate-400">Change:</span>
                          <span className="text-purple-400 ml-2">
                            +${(category.recommended - category.current).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Security Posture Comparison */}
            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Security Posture Impact</CardTitle>
                <CardDescription className="text-slate-400">
                  Before vs after optimization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="#374151" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                    <PolarRadiusAxis 
                      angle={0} 
                      domain={[0, 100]} 
                      tick={{ fill: '#9CA3AF', fontSize: 10 }}
                    />
                    <Radar
                      name="Current"
                      dataKey="current"
                      stroke="#EF4444"
                      fill="#EF4444"
                      fillOpacity={0.2}
                      strokeWidth={2}
                    />
                    <Radar
                      name="Optimized"
                      dataKey="optimized"
                      stroke="#10B981"
                      fill="#10B981"
                      fillOpacity={0.2}
                      strokeWidth={2}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px'
                      }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Key Insights */}
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Key Insights & Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-400 mb-2" />
                  <h4 className="font-medium text-green-400 mb-1">Expected ROI Increase</h4>
                  <p className="text-sm text-slate-300">Portfolio ROI will improve by 34% with optimized allocation</p>
                </div>
                <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                  <Target className="h-5 w-5 text-blue-400 mb-2" />
                  <h4 className="font-medium text-blue-400 mb-1">Risk Reduction</h4>
                  <p className="text-sm text-slate-300">Overall risk score will decrease from 65 to 42</p>
                </div>
                <div className="p-4 bg-purple-900/20 border border-purple-500/30 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-purple-400 mb-2" />
                  <h4 className="font-medium text-purple-400 mb-1">Cost Efficiency</h4>
                  <p className="text-sm text-slate-300">22% more protection per dollar invested</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InvestmentOptimizer;
