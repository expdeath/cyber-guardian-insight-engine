
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Server, Database, Wifi, Smartphone, Shield, AlertTriangle, Search, Plus, Filter } from 'lucide-react';

const AssetInventory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterCriticality, setFilterCriticality] = useState('all');

  const assetTypes = [
    { type: 'server', icon: Server, name: 'Servers', count: 45, color: 'text-blue-400' },
    { type: 'database', icon: Database, name: 'Databases', count: 12, color: 'text-green-400' },
    { type: 'network', icon: Wifi, name: 'Network Devices', count: 28, color: 'text-purple-400' },
    { type: 'endpoint', icon: Smartphone, name: 'Endpoints', count: 156, color: 'text-orange-400' },
  ];

  const assets = [
    {
      id: 'SRV-001',
      name: 'Primary Web Server',
      type: 'server',
      criticality: 'critical',
      owner: 'IT Operations',
      location: 'Data Center A',
      riskScore: 85,
      lastUpdated: '2024-01-15',
      vulnerabilities: 3,
      compliance: 'compliant'
    },
    {
      id: 'DB-001',
      name: 'Customer Database',
      type: 'database',
      criticality: 'critical',
      owner: 'Database Team',
      location: 'Data Center A',
      riskScore: 92,
      lastUpdated: '2024-01-14',
      vulnerabilities: 1,
      compliance: 'compliant'
    },
    {
      id: 'NET-003',
      name: 'Core Router',
      type: 'network',
      criticality: 'high',
      owner: 'Network Team',
      location: 'Data Center B',
      riskScore: 45,
      lastUpdated: '2024-01-16',
      vulnerabilities: 0,
      compliance: 'compliant'
    },
    {
      id: 'SRV-012',
      name: 'Backup Server',
      type: 'server',
      criticality: 'medium',
      owner: 'IT Operations',
      location: 'Data Center B',
      riskScore: 38,
      lastUpdated: '2024-01-10',
      vulnerabilities: 2,
      compliance: 'review-needed'
    },
    {
      id: 'EP-045',
      name: 'Executive Laptop',
      type: 'endpoint',
      criticality: 'high',
      owner: 'Executive Team',
      location: 'HQ Floor 5',
      riskScore: 67,
      lastUpdated: '2024-01-13',
      vulnerabilities: 4,
      compliance: 'non-compliant'
    },
    {
      id: 'DB-003',
      name: 'Analytics Database',
      type: 'database',
      criticality: 'medium',
      owner: 'Analytics Team',
      location: 'Cloud Region US-East',
      riskScore: 52,
      lastUpdated: '2024-01-12',
      vulnerabilities: 1,
      compliance: 'compliant'
    },
  ];

  const getCriticalityColor = (criticality) => {
    switch (criticality) {
      case 'critical': return 'bg-red-600';
      case 'high': return 'bg-orange-600';
      case 'medium': return 'bg-yellow-600';
      case 'low': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  const getComplianceColor = (compliance) => {
    switch (compliance) {
      case 'compliant': return 'bg-green-600';
      case 'review-needed': return 'bg-yellow-600';
      case 'non-compliant': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const getRiskColor = (score) => {
    if (score >= 80) return 'text-red-400';
    if (score >= 60) return 'text-orange-400';
    if (score >= 40) return 'text-yellow-400';
    return 'text-green-400';
  };

  const getAssetIcon = (type) => {
    const assetType = assetTypes.find(at => at.type === type);
    return assetType ? assetType.icon : Server;
  };

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.owner.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || asset.type === filterType;
    const matchesCriticality = filterCriticality === 'all' || asset.criticality === filterCriticality;
    
    return matchesSearch && matchesType && matchesCriticality;
  });

  const totalAssets = assetTypes.reduce((sum, type) => sum + type.count, 0);
  const criticalAssets = assets.filter(a => a.criticality === 'critical').length;
  const highRiskAssets = assets.filter(a => a.riskScore >= 80).length;
  const nonCompliantAssets = assets.filter(a => a.compliance === 'non-compliant').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Asset Inventory & Risk Management</h2>
          <p className="text-slate-400">Comprehensive asset tracking and security assessment</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Asset
        </Button>
      </div>

      {/* Asset Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Assets</p>
                <p className="text-2xl font-bold text-blue-400">{totalAssets}</p>
              </div>
              <Shield className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Critical Assets</p>
                <p className="text-2xl font-bold text-red-400">{criticalAssets}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">High Risk</p>
                <p className="text-2xl font-bold text-orange-400">{highRiskAssets}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Non-Compliant</p>
                <p className="text-2xl font-bold text-red-400">{nonCompliantAssets}</p>
              </div>
              <Shield className="h-8 w-8 text-red-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Asset Type Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {assetTypes.map((type) => (
          <Card key={type.type} className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">{type.name}</p>
                  <p className={`text-xl font-bold ${type.color}`}>{type.count}</p>
                </div>
                <type.icon className={`h-6 w-6 ${type.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters and Search */}
      <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Asset Registry</CardTitle>
          <CardDescription className="text-slate-400">
            Detailed inventory with risk assessment and compliance status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search assets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-slate-700 border-slate-600 text-white"
                />
              </div>
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-40 bg-slate-700 border-slate-600">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="server">Servers</SelectItem>
                <SelectItem value="database">Databases</SelectItem>
                <SelectItem value="network">Network</SelectItem>
                <SelectItem value="endpoint">Endpoints</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterCriticality} onValueChange={setFilterCriticality}>
              <SelectTrigger className="w-40 bg-slate-700 border-slate-600">
                <SelectValue placeholder="Criticality" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Asset Table */}
          <div className="rounded-lg border border-slate-600 overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-700/50">
                <TableRow>
                  <TableHead className="text-slate-300">Asset</TableHead>
                  <TableHead className="text-slate-300">Type</TableHead>
                  <TableHead className="text-slate-300">Criticality</TableHead>
                  <TableHead className="text-slate-300">Owner</TableHead>
                  <TableHead className="text-slate-300">Risk Score</TableHead>
                  <TableHead className="text-slate-300">Vulnerabilities</TableHead>
                  <TableHead className="text-slate-300">Compliance</TableHead>
                  <TableHead className="text-slate-300">Last Updated</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAssets.map((asset) => {
                  const AssetIcon = getAssetIcon(asset.type);
                  return (
                    <TableRow key={asset.id} className="border-slate-600 hover:bg-slate-700/30">
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <AssetIcon className="h-5 w-5 text-slate-400" />
                          <div>
                            <div className="font-medium text-white">{asset.name}</div>
                            <div className="text-sm text-slate-400">{asset.id}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-slate-600 text-slate-200">
                          {asset.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getCriticalityColor(asset.criticality)}>
                          {asset.criticality}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-slate-300">{asset.owner}</TableCell>
                      <TableCell>
                        <span className={`font-medium ${getRiskColor(asset.riskScore)}`}>
                          {asset.riskScore}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <span className={asset.vulnerabilities > 0 ? 'text-red-400' : 'text-green-400'}>
                            {asset.vulnerabilities}
                          </span>
                          {asset.vulnerabilities > 0 && (
                            <AlertTriangle className="h-4 w-4 text-red-400" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getComplianceColor(asset.compliance)}>
                          {asset.compliance.replace('-', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-slate-400 text-sm">
                        {asset.lastUpdated}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {filteredAssets.length === 0 && (
            <div className="text-center py-8 text-slate-400">
              No assets found matching your criteria.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AssetInventory;
