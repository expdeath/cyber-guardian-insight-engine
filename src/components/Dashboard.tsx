
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, Legend } from 'recharts';
import { TrendingUp, TrendingDown, Shield, AlertTriangle, DollarSign, RefreshCw } from 'lucide-react';

const Dashboard = () => {
  const [refreshing, setRefreshing] = useState(false);

  const riskReductionData = [
    { month: 'Jan', risk: 85, investment: 120000 },
    { month: 'Feb', risk: 78, investment: 150000 },
    { month: 'Mar', risk: 72, investment: 180000 },
    { month: 'Apr', risk: 65, investment: 220000 },
    { month: 'May', risk: 58, investment: 250000 },
    { month: 'Jun', risk: 52, investment: 280000 },
  ];

  const investmentAllocation = [
    { name: 'Network Security', value: 35, color: '#3B82F6' },
    { name: 'Endpoint Protection', value: 25, color: '#8B5CF6' },
    { name: 'Identity Management', value: 20, color: '#10B981' },
    { name: 'Security Monitoring', value: 15, color: '#F59E0B' },
    { name: 'Compliance', value: 5, color: '#EF4444' },
  ];

  const threatMitigation = [
    { category: 'Malware', mitigated: 95, total: 100 },
    { category: 'Phishing', mitigated: 87, total: 100 },
    { category: 'Insider Threats', mitigated: 72, total: 100 },
    { category: 'DDoS', mitigated: 89, total: 100 },
    { category: 'Data Breach', mitigated: 83, total: 100 },
  ];

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setRefreshing(false);
  };

  return (
    <div className="space-y-6">
      {/* Header with Refresh */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Cybersecurity Portfolio Dashboard</h2>
          <p className="text-slate-400">Real-time insights and performance metrics</p>
        </div>
        <Button 
          onClick={handleRefresh} 
          disabled={refreshing}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh Data
        </Button>
      </div>

      {/* Key Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Portfolio ROI</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-green-400">+247%</span>
              <TrendingUp className="h-5 w-5 text-green-400" />
            </div>
            <p className="text-xs text-slate-500 mt-1">+12% from last quarter</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Risk Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-orange-400">52</span>
              <TrendingDown className="h-5 w-5 text-green-400" />
            </div>
            <p className="text-xs text-slate-500 mt-1">-38% reduction this year</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Active Threats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-red-400">23</span>
              <AlertTriangle className="h-5 w-5 text-red-400" />
            </div>
            <p className="text-xs text-slate-500 mt-1">-67% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Budget Utilized</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-blue-400">73%</span>
              <DollarSign className="h-5 w-5 text-blue-400" />
            </div>
            <p className="text-xs text-slate-500 mt-1">$2.1M of $2.9M allocated</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Reduction Over Time */}
        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Risk Reduction Trend</CardTitle>
            <CardDescription className="text-slate-400">
              Risk score vs investment over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={riskReductionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="risk" 
                  stroke="#EF4444" 
                  strokeWidth={3}
                  name="Risk Score"
                />
                <Line 
                  type="monotone" 
                  dataKey="investment" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  name="Investment ($)"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Investment Allocation */}
        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Investment Allocation</CardTitle>
            <CardDescription className="text-slate-400">
              Current portfolio distribution
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={investmentAllocation}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {investmentAllocation.map((entry, index) => (
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
      </div>

      {/* Threat Mitigation Status */}
      <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Threat Mitigation Effectiveness</CardTitle>
          <CardDescription className="text-slate-400">
            Current protection levels across threat categories
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {threatMitigation.map((threat, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-300">{threat.category}</span>
                <Badge 
                  variant={threat.mitigated >= 90 ? "default" : threat.mitigated >= 75 ? "secondary" : "destructive"}
                  className={
                    threat.mitigated >= 90 
                      ? "bg-green-600 text-white" 
                      : threat.mitigated >= 75 
                      ? "bg-yellow-600 text-white" 
                      : "bg-red-600 text-white"
                  }
                >
                  {threat.mitigated}%
                </Badge>
              </div>
              <Progress 
                value={threat.mitigated} 
                className="h-2"
                style={{
                  backgroundColor: '#374151'
                }}
              />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
