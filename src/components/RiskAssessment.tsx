
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle, Shield, TrendingUp, Activity, Zap, Eye, Brain } from 'lucide-react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TreemapChart, Cell } from 'recharts';

const RiskAssessment = () => {
  const [selectedThreat, setSelectedThreat] = useState('all');
  const [analysisRunning, setAnalysisRunning] = useState(false);

  const threatLandscape = [
    { name: 'Malware', probability: 85, impact: 75, mitigation: 90, color: '#EF4444' },
    { name: 'Phishing', probability: 92, impact: 60, mitigation: 85, color: '#F59E0B' },
    { name: 'Insider Threat', probability: 35, impact: 95, mitigation: 65, color: '#8B5CF6' },
    { name: 'DDoS', probability: 45, impact: 55, mitigation: 88, color: '#3B82F6' },
    { name: 'Data Breach', probability: 68, impact: 90, mitigation: 78, color: '#10B981' },
    { name: 'Ransomware', probability: 78, impact: 85, mitigation: 82, color: '#F97316' },
  ];

  const riskCategories = [
    { category: 'Critical Infrastructure', risk: 87, trend: 'increasing', mitigated: 68 },
    { category: 'Data Assets', risk: 72, trend: 'stable', mitigated: 85 },
    { category: 'Human Resources', risk: 65, trend: 'decreasing', mitigated: 78 },
    { category: 'Network Perimeter', risk: 58, trend: 'decreasing', mitigated: 92 },
    { category: 'Third-party Services', risk: 79, trend: 'increasing', mitigated: 61 },
  ];

  const predictiveThreats = [
    { threat: 'AI-powered Social Engineering', probability: 78, timeframe: '3-6 months', severity: 'High' },
    { threat: 'Supply Chain Attacks', probability: 85, timeframe: '1-3 months', severity: 'Critical' },
    { threat: 'Quantum Computing Threats', probability: 25, timeframe: '2-5 years', severity: 'Critical' },
    { threat: 'IoT Botnets', probability: 67, timeframe: '6-12 months', severity: 'Medium' },
  ];

  const runRiskAnalysis = async () => {
    setAnalysisRunning(true);
    await new Promise(resolve => setTimeout(resolve, 2500));
    setAnalysisRunning(false);
  };

  const getRiskColor = (risk) => {
    if (risk >= 80) return 'text-red-400';
    if (risk >= 60) return 'text-orange-400';
    if (risk >= 40) return 'text-yellow-400';
    return 'text-green-400';
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'increasing': return <TrendingUp className="h-4 w-4 text-red-400" />;
      case 'decreasing': return <TrendingUp className="h-4 w-4 text-green-400 rotate-180" />;
      default: return <Activity className="h-4 w-4 text-blue-400" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Risk Assessment & Threat Analysis</h2>
          <p className="text-slate-400">Advanced threat modeling and predictive risk analytics</p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge className="bg-orange-600 text-white">
            <Brain className="h-3 w-3 mr-1" />
            Predictive AI
          </Badge>
          <Button onClick={runRiskAnalysis} disabled={analysisRunning}>
            {analysisRunning ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            ) : (
              <Eye className="h-4 w-4 mr-2" />
            )}
            Run Analysis
          </Button>
        </div>
      </div>

      <Tabs defaultValue="current" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-slate-800/50">
          <TabsTrigger value="current">Current Threats</TabsTrigger>
          <TabsTrigger value="predictive">Predictive Analysis</TabsTrigger>
          <TabsTrigger value="mitigation">Mitigation Status</TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-6">
          {/* Risk Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {riskCategories.map((item, index) => (
              <Card key={index} className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-slate-400">{item.category}</CardTitle>
                    {getTrendIcon(item.trend)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className={`text-2xl font-bold ${getRiskColor(item.risk)}`}>
                      {item.risk}
                    </div>
                    <Progress value={item.risk} className="h-2" />
                    <div className="text-xs text-slate-500">
                      {item.mitigated}% mitigated
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Threat Landscape */}
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white">Threat Landscape Analysis</CardTitle>
                  <CardDescription className="text-slate-400">
                    Probability vs Impact assessment with current mitigation levels
                  </CardDescription>
                </div>
                <Select value={selectedThreat} onValueChange={setSelectedThreat}>
                  <SelectTrigger className="w-40 bg-slate-700 border-slate-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    <SelectItem value="all">All Threats</SelectItem>
                    {threatLandscape.map((threat) => (
                      <SelectItem key={threat.name} value={threat.name.toLowerCase()}>
                        {threat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <ScatterChart data={threatLandscape}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    type="number" 
                    dataKey="probability" 
                    name="Probability"
                    stroke="#9CA3AF"
                    label={{ value: 'Probability (%)', position: 'insideBottom', offset: -10 }}
                  />
                  <YAxis 
                    type="number" 
                    dataKey="impact" 
                    name="Impact"
                    stroke="#9CA3AF"
                    label={{ value: 'Impact Level', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                    formatter={(value, name) => [
                      `${value}%`, 
                      name.charAt(0).toUpperCase() + name.slice(1)
                    ]}
                  />
                  <Scatter 
                    dataKey="impact" 
                    fill="#8884d8"
                  >
                    {threatLandscape.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="predictive" className="space-y-6">
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Brain className="h-5 w-5 mr-2 text-purple-400" />
                Emerging Threat Predictions
              </CardTitle>
              <CardDescription className="text-slate-400">
                AI-powered analysis of future cybersecurity threats
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {predictiveThreats.map((threat, index) => (
                  <div key={index} className="p-4 bg-slate-700/30 rounded-lg border border-slate-600">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-medium text-white">{threat.threat}</h4>
                      <Badge 
                        variant={threat.severity === 'Critical' ? 'destructive' : threat.severity === 'High' ? 'secondary' : 'default'}
                        className={
                          threat.severity === 'Critical' 
                            ? "bg-red-600" 
                            : threat.severity === 'High' 
                            ? "bg-orange-600" 
                            : "bg-yellow-600"
                        }
                      >
                        {threat.severity}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-slate-400">Probability:</span>
                        <div className="flex items-center mt-1">
                          <Progress value={threat.probability} className="flex-1 mr-2 h-2" />
                          <span className="text-white font-medium">{threat.probability}%</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-slate-400">Timeframe:</span>
                        <div className="text-white font-medium mt-1">{threat.timeframe}</div>
                      </div>
                      <div>
                        <span className="text-slate-400">Preparedness:</span>
                        <div className="text-orange-400 font-medium mt-1">
                          Requires Attention
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Threat Intelligence Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                  <Zap className="h-5 w-5 text-blue-400 mb-2" />
                  <h4 className="font-medium text-blue-400 mb-1">Attack Vectors Evolving</h4>
                  <p className="text-sm text-slate-300">AI-enhanced attacks increasing by 340% quarterly</p>
                </div>
                <div className="p-4 bg-purple-900/20 border border-purple-500/30 rounded-lg">
                  <Shield className="h-5 w-5 text-purple-400 mb-2" />
                  <h4 className="font-medium text-purple-400 mb-1">Zero-Day Predictions</h4>
                  <p className="text-sm text-slate-300">87% accuracy in predicting new vulnerability types</p>
                </div>
                <div className="p-4 bg-orange-900/20 border border-orange-500/30 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-orange-400 mb-2" />
                  <h4 className="font-medium text-orange-400 mb-1">Industry Targeting</h4>
                  <p className="text-sm text-slate-300">Your sector 2.3x more likely to be targeted</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mitigation" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Mitigation Effectiveness</CardTitle>
                <CardDescription className="text-slate-400">
                  Current protection levels by threat type
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {threatLandscape.map((threat, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-300">{threat.name}</span>
                      <Badge 
                        variant={threat.mitigation >= 85 ? "default" : threat.mitigation >= 70 ? "secondary" : "destructive"}
                        className={
                          threat.mitigation >= 85 
                            ? "bg-green-600" 
                            : threat.mitigation >= 70 
                            ? "bg-yellow-600" 
                            : "bg-red-600"
                        }
                      >
                        {threat.mitigation}%
                      </Badge>
                    </div>
                    <Progress value={threat.mitigation} className="h-2" />
                    <div className="text-xs text-slate-500">
                      Risk Level: {threat.probability * threat.impact / 100 > 70 ? 'High' : 
                                  threat.probability * threat.impact / 100 > 40 ? 'Medium' : 'Low'}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Recommended Actions</CardTitle>
                <CardDescription className="text-slate-400">
                  Priority mitigation strategies
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-red-400">Critical Priority</h4>
                      <p className="text-sm text-slate-300 mt-1">
                        Enhance insider threat detection capabilities immediately
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-orange-900/20 border border-orange-500/30 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="h-5 w-5 text-orange-400 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-orange-400">High Priority</h4>
                      <p className="text-sm text-slate-300 mt-1">
                        Strengthen third-party risk assessment processes
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Shield className="h-5 w-5 text-yellow-400 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-400">Medium Priority</h4>
                      <p className="text-sm text-slate-300 mt-1">
                        Implement advanced phishing simulation training
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Eye className="h-5 w-5 text-blue-400 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-400">Monitoring</h4>
                      <p className="text-sm text-slate-300 mt-1">
                        Continue monitoring current mitigation effectiveness
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RiskAssessment;
