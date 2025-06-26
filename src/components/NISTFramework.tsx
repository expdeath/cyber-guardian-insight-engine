
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Shield, CheckCircle, AlertCircle, BookOpen, Target, TrendingUp } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const NISTFramework = () => {
  const [selectedFunction, setSelectedFunction] = useState('identify');

  const nistFunctions = [
    {
      id: 'identify',
      name: 'Identify',
      score: 78,
      description: 'Develop organizational understanding of cybersecurity risk',
      icon: Target,
      color: '#3B82F6',
      categories: [
        { name: 'Asset Management', score: 85, implemented: 12, total: 15 },
        { name: 'Business Environment', score: 72, implemented: 8, total: 11 },
        { name: 'Governance', score: 68, implemented: 9, total: 13 },
        { name: 'Risk Assessment', score: 82, implemented: 14, total: 17 },
        { name: 'Risk Management Strategy', score: 75, implemented: 6, total: 8 },
        { name: 'Supply Chain Risk', score: 69, implemented: 7, total: 10 }
      ]
    },
    {
      id: 'protect',
      name: 'Protect',
      score: 85,
      description: 'Develop and implement appropriate safeguards',
      icon: Shield,
      color: '#10B981',
      categories: [
        { name: 'Identity Management', score: 90, implemented: 18, total: 20 },
        { name: 'Awareness Training', score: 78, implemented: 14, total: 18 },
        { name: 'Data Security', score: 88, implemented: 22, total: 25 },
        { name: 'Info Protection', score: 82, implemented: 16, total: 19 },
        { name: 'Maintenance', score: 79, implemented: 11, total: 14 },
        { name: 'Protective Technology', score: 91, implemented: 20, total: 22 }
      ]
    },
    {
      id: 'detect',
      name: 'Detect',
      score: 72,
      description: 'Develop and implement activities to identify cybersecurity events',
      icon: AlertCircle,
      color: '#F59E0B',
      categories: [
        { name: 'Anomalies & Events', score: 75, implemented: 9, total: 12 },
        { name: 'Security Monitoring', score: 68, implemented: 15, total: 22 },
        { name: 'Detection Processes', score: 73, implemented: 8, total: 11 }
      ]
    },
    {
      id: 'respond',
      name: 'Respond',
      score: 65,
      description: 'Develop and implement appropriate activities during cybersecurity incidents',
      icon: TrendingUp,
      color: '#EF4444',
      categories: [
        { name: 'Response Planning', score: 70, implemented: 7, total: 10 },
        { name: 'Communications', score: 58, implemented: 5, total: 9 },
        { name: 'Analysis', score: 64, implemented: 9, total: 14 },
        { name: 'Mitigation', score: 72, implemented: 8, total: 11 },
        { name: 'Improvements', score: 60, implemented: 3, total: 5 }
      ]
    },
    {
      id: 'recover',
      name: 'Recover',
      score: 58,
      description: 'Develop and implement activities to maintain resilience plans',
      icon: CheckCircle,
      color: '#8B5CF6',
      categories: [
        { name: 'Recovery Planning', score: 62, implemented: 5, total: 8 },
        { name: 'Improvements', score: 55, implemented: 6, total: 11 },
        { name: 'Communications', score: 58, implemented: 4, total: 7 }
      ]
    }
  ];

  const overallMaturity = [
    { level: 'Partial', count: 45, color: '#EF4444' },
    { level: 'Risk Informed', count: 32, color: '#F59E0B' },
    { level: 'Repeatable', count: 18, color: '#10B981' },
    { level: 'Adaptive', count: 5, color: '#3B82F6' }
  ];

  const selectedFunctionData = nistFunctions.find(f => f.id === selectedFunction);
  const averageScore = nistFunctions.reduce((sum, f) => sum + f.score, 0) / nistFunctions.length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">NIST Cybersecurity Framework</h2>
          <p className="text-slate-400">Comprehensive framework alignment and gap analysis</p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge className="bg-blue-600 text-white">
            <BookOpen className="h-3 w-3 mr-1" />
            NIST 1.1
          </Badge>
          <div className="text-right">
            <div className="text-sm text-slate-400">Overall Maturity</div>
            <div className="text-xl font-bold text-white">{averageScore.toFixed(0)}%</div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-slate-800/50">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="functions">Functions</TabsTrigger>
          <TabsTrigger value="assessment">Assessment</TabsTrigger>
          <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Framework Score Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Framework Function Scores</CardTitle>
                <CardDescription className="text-slate-400">
                  Current implementation levels across NIST functions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={nistFunctions}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="score"
                      nameKey="name"
                      label={({ name, score }) => `${name}: ${score}%`}
                    >
                      {nistFunctions.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Maturity Distribution</CardTitle>
                <CardDescription className="text-slate-400">
                  Implementation maturity across all subcategories
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={overallMaturity}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="level" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="count" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Quick Function Overview */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {nistFunctions.map((func) => (
              <Card key={func.id} className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <func.icon className="h-6 w-6" style={{ color: func.color }} />
                    <Badge 
                      variant={func.score >= 80 ? "default" : func.score >= 60 ? "secondary" : "destructive"}
                      className={
                        func.score >= 80 
                          ? "bg-green-600" 
                          : func.score >= 60 
                          ? "bg-yellow-600" 
                          : "bg-red-600"
                      }
                    >
                      {func.score}%
                    </Badge>
                  </div>
                  <h3 className="font-medium text-white mb-2">{func.name}</h3>
                  <Progress value={func.score} className="h-2" />
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="functions" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Function Selector */}
            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">NIST Functions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {nistFunctions.map((func) => (
                  <Button
                    key={func.id}
                    variant={selectedFunction === func.id ? "default" : "ghost"}
                    className={`w-full justify-start ${
                      selectedFunction === func.id 
                        ? "bg-blue-600 text-white" 
                        : "text-slate-300 hover:text-white hover:bg-slate-700"
                    }`}
                    onClick={() => setSelectedFunction(func.id)}
                  >
                    <func.icon className="h-4 w-4 mr-2" />
                    {func.name}
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Function Details */}
            <div className="lg:col-span-2 space-y-4">
              <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <selectedFunctionData.icon 
                        className="h-6 w-6" 
                        style={{ color: selectedFunctionData.color }} 
                      />
                      <div>
                        <CardTitle className="text-white">{selectedFunctionData.name}</CardTitle>
                        <CardDescription className="text-slate-400">
                          {selectedFunctionData.description}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">{selectedFunctionData.score}%</div>
                      <div className="text-sm text-slate-400">Implementation</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedFunctionData.categories.map((category, index) => (
                      <div key={index} className="p-3 bg-slate-700/30 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-white">{category.name}</h4>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-slate-400">
                              {category.implemented}/{category.total}
                            </span>
                            <Badge 
                              variant={category.score >= 80 ? "default" : category.score >= 60 ? "secondary" : "destructive"}
                              className={
                                category.score >= 80 
                                  ? "bg-green-600" 
                                  : category.score >= 60 
                                  ? "bg-yellow-600" 
                                  : "bg-red-600"
                              }
                            >
                              {category.score}%
                            </Badge>
                          </div>
                        </div>
                        <Progress value={category.score} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="assessment" className="space-y-6">
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Detailed Assessment</CardTitle>
              <CardDescription className="text-slate-400">
                Framework subcategory implementation status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="space-y-2">
                {nistFunctions.map((func) => (
                  <AccordionItem key={func.id} value={func.id} className="border-slate-600">
                    <AccordionTrigger className="text-white hover:text-slate-300">
                      <div className="flex items-center space-x-3">
                        <func.icon className="h-5 w-5" style={{ color: func.color }} />
                        <span>{func.name}</span>
                        <Badge className={`ml-auto mr-2 ${
                          func.score >= 80 ? "bg-green-600" : 
                          func.score >= 60 ? "bg-yellow-600" : "bg-red-600"
                        }`}>
                          {func.score}%
                        </Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {func.categories.map((category, index) => (
                          <div key={index} className="p-3 bg-slate-700/20 rounded border border-slate-600">
                            <div className="flex justify-between items-center mb-2">
                              <h5 className="font-medium text-slate-300">{category.name}</h5>
                              <span className="text-sm text-slate-400">
                                {category.implemented}/{category.total}
                              </span>
                            </div>
                            <Progress value={(category.implemented / category.total) * 100} className="h-2" />
                            <div className="mt-2 text-xs text-slate-400">
                              Score: {category.score}% | 
                              {category.total - category.implemented > 0 && 
                                ` ${category.total - category.implemented} gaps identified`
                              }
                            </div>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roadmap" className="space-y-6">
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Implementation Roadmap</CardTitle>
              <CardDescription className="text-slate-400">
                Recommended improvement priorities and timeline
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
                  <h4 className="font-medium text-red-400 mb-3 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    Immediate Actions (0-3 months)
                  </h4>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li>• Improve incident response communications processes</li>
                    <li>• Establish recovery planning documentation</li>
                    <li>• Enhance detection and monitoring capabilities</li>
                  </ul>
                </div>

                <div className="p-4 bg-orange-900/20 border border-orange-500/30 rounded-lg">
                  <h4 className="font-medium text-orange-400 mb-3 flex items-center">
                    <Target className="h-4 w-4 mr-2" />
                    Short-term Goals (3-6 months)
                  </h4>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li>• Strengthen governance and risk management processes</li>
                    <li>• Expand security awareness training programs</li>
                    <li>• Improve supply chain risk management</li>
                  </ul>
                </div>

                <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                  <h4 className="font-medium text-blue-400 mb-3 flex 
-center">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Long-term Objectives (6-12 months)
                  </h4>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li>• Achieve repeatable maturity level across all functions</li>
                    <li>• Implement continuous improvement processes</li>
                    <li>• Develop adaptive response capabilities</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NISTFramework;
