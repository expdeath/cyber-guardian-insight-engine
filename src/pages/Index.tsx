
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Shield, TrendingUp, AlertTriangle, DollarSign, Target, Users, Lock, FileText } from 'lucide-react';
import Dashboard from '@/components/Dashboard';
import InvestmentOptimizer from '@/components/InvestmentOptimizer';
import RiskAssessment from '@/components/RiskAssessment';
import NISTFramework from '@/components/NISTFramework';
import AssetInventory from '@/components/AssetInventory';
import ReportingTools from '@/components/ReportingTools';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [systemHealth, setSystemHealth] = useState(95);

  useEffect(() => {
    // Simulate real-time system health updates
    const interval = setInterval(() => {
      setSystemHealth(prev => 90 + Math.random() * 10);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const quickStats = [
    { label: 'Portfolio Efficiency', value: '87%', icon: Target, color: 'text-green-500' },
    { label: 'Cost Savings', value: '$2.4M', icon: DollarSign, color: 'text-blue-500' },
    { label: 'Risk Reduction', value: '64%', icon: Shield, color: 'text-purple-500' },
    { label: 'Threats Mitigated', value: '1,247', icon: AlertTriangle, color: 'text-orange-500' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <div className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">CyberInvest Pro</h1>
                <p className="text-sm text-slate-300">Cybersecurity Investment Decision Support</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-slate-300">System Health: {systemHealth.toFixed(0)}%</span>
              </div>
              <Badge variant="outline" className="text-green-400 border-green-400">
                <Lock className="h-3 w-3 mr-1" />
                Secure
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {quickStats.map((stat, index) => (
            <Card key={index} className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">{stat.label}</p>
                    <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-slate-800/50 p-1">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-blue-600">
              <TrendingUp className="h-4 w-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="optimizer" className="data-[state=active]:bg-blue-600">
              <Target className="h-4 w-4 mr-2" />
              Optimizer
            </TabsTrigger>
            <TabsTrigger value="risk" className="data-[state=active]:bg-blue-600">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Risk Assessment
            </TabsTrigger>
            <TabsTrigger value="nist" className="data-[state=active]:bg-blue-600">
              <Shield className="h-4 w-4 mr-2" />
              NIST Framework
            </TabsTrigger>
            <TabsTrigger value="assets" className="data-[state=active]:bg-blue-600">
              <Users className="h-4 w-4 mr-2" />
              Asset Inventory
            </TabsTrigger>
            <TabsTrigger value="reports" className="data-[state=active]:bg-blue-600">
              <FileText className="h-4 w-4 mr-2" />
              Reports
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <Dashboard />
          </TabsContent>

          <TabsContent value="optimizer" className="space-y-6">
            <InvestmentOptimizer />
          </TabsContent>

          <TabsContent value="risk" className="space-y-6">
            <RiskAssessment />
          </TabsContent>

          <TabsContent value="nist" className="space-y-6">
            <NISTFramework />
          </TabsContent>

          <TabsContent value="assets" className="space-y-6">
            <AssetInventory />
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <ReportingTools />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
