
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Download, Calendar, TrendingUp, Shield, AlertTriangle, Target, Users, Mail, Clock } from 'lucide-react';

const ReportingTools = () => {
  const [selectedReport, setSelectedReport] = useState('executive');
  const [generatingReport, setGeneratingReport] = useState(false);

  const reportTemplates = [
    {
      id: 'executive',
      name: 'Executive Summary',
      description: 'High-level cybersecurity posture overview for leadership',
      icon: TrendingUp,
      audience: 'C-Suite',
      frequency: 'Monthly',
      pages: '2-3',
      lastGenerated: '2024-01-15'
    },
    {
      id: 'technical',
      name: 'Technical Assessment',
      description: 'Detailed technical analysis and recommendations',
      icon: Shield,
      audience: 'IT Teams',
      frequency: 'Weekly',
      pages: '8-12',
      lastGenerated: '2024-01-16'
    },
    {
      id: 'compliance',
      name: 'Compliance Report',
      description: 'NIST framework alignment and regulatory compliance status',
      icon: FileText,
      audience: 'Auditors',
      frequency: 'Quarterly',
      pages: '15-20',
      lastGenerated: '2024-01-10'
    },
    {
      id: 'risk',
      name: 'Risk Assessment',
      description: 'Comprehensive risk analysis and mitigation strategies',
      icon: AlertTriangle,
      audience: 'Risk Managers',
      frequency: 'Monthly',
      pages: '10-15',
      lastGenerated: '2024-01-12'
    },
    {
      id: 'investment',
      name: 'Investment Analysis',
      description: 'ROI analysis and budget optimization recommendations',
      icon: Target,
      audience: 'Financial',
      frequency: 'Quarterly',
      pages: '6-8',
      lastGenerated: '2024-01-08'
    },
    {
      id: 'incident',
      name: 'Incident Response',
      description: 'Security incident summary and lessons learned',
      icon: AlertTriangle,
      audience: 'All Stakeholders',
      frequency: 'As Needed',
      pages: '4-6',
      lastGenerated: '2024-01-14'
    }
  ];

  const scheduledReports = [
    {
      name: 'Weekly Security Digest',
      nextRun: '2024-01-22',
      recipients: ['security@company.com', 'it-team@company.com'],
      type: 'technical'
    },
    {
      name: 'Monthly Executive Brief',
      nextRun: '2024-02-01',
      recipients: ['ceo@company.com', 'cto@company.com', 'board@company.com'],
      type: 'executive'
    },
    {
      name: 'Quarterly Compliance Review',
      nextRun: '2024-04-01',
      recipients: ['compliance@company.com', 'legal@company.com'],
      type: 'compliance'
    }
  ];

  const recentReports = [
    {
      name: 'Q4 2023 Executive Summary',
      type: 'executive',
      generatedDate: '2024-01-15',
      size: '2.3 MB',
      downloads: 47
    },
    {
      name: 'January Technical Assessment',
      type: 'technical',
      generatedDate: '2024-01-16',
      size: '5.7 MB',
      downloads: 23
    },
    {
      name: 'NIST Compliance Report',
      type: 'compliance',
      generatedDate: '2024-01-10',
      size: '8.9 MB',
      downloads: 15
    },
    {
      name: 'Risk Analysis - January 2024',
      type: 'risk',
      generatedDate: '2024-01-12',
      size: '4.1 MB',
      downloads: 31
    }
  ];

  const generateReport = async (reportType) => {
    setGeneratingReport(true);
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    setGeneratingReport(false);
  };

  const getReportIcon = (type) => {
    const template = reportTemplates.find(t => t.id === type);
    return template ? template.icon : FileText;
  };

  const selectedTemplate = reportTemplates.find(t => t.id === selectedReport);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Reporting & Analytics</h2>
          <p className="text-slate-400">Generate comprehensive cybersecurity reports and insights</p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge className="bg-green-600 text-white">
            <FileText className="h-3 w-3 mr-1" />
            GDPR Compliant
          </Badge>
          <Button 
            onClick={() => generateReport(selectedReport)}
            disabled={generatingReport}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {generatingReport ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Generating...
              </>
            ) : (
              <>
                <Download className="h-4 w-4 mr-2" />
                Generate Report
              </>
            )}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="templates" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-slate-800/50">
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="recent">Recent Reports</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Report Templates */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reportTemplates.map((template) => (
                  <Card 
                    key={template.id} 
                    className={`bg-slate-800/50 backdrop-blur-sm border-slate-700 cursor-pointer transition-all ${
                      selectedReport === template.id ? 'ring-2 ring-blue-500' : ''
                    }`}
                    onClick={() => setSelectedReport(template.id)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <template.icon className="h-6 w-6 text-blue-400" />
                        <Badge variant="outline" className="text-xs">
                          {template.frequency}
                        </Badge>
                      </div>
                      <CardTitle className="text-white text-lg">{template.name}</CardTitle>
                      <CardDescription className="text-slate-400 text-sm">
                        {template.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-slate-500">Audience:</span>
                          <div className="text-slate-300">{template.audience}</div>
                        </div>
                        <div>
                          <span className="text-slate-500">Pages:</span>
                          <div className="text-slate-300">{template.pages}</div>
                        </div>
                      </div>
                      <div className="mt-2 text-xs text-slate-500">
                        Last: {template.lastGenerated}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Selected Template Details */}
            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <selectedTemplate.icon className="h-5 w-5 mr-2 text-blue-400" />
                  {selectedTemplate.name}
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Report configuration and options
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-slate-300">Time Period</label>
                    <Select defaultValue="current-month">
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-white mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-700 border-slate-600">
                        <SelectItem value="current-month">Current Month</SelectItem>
                        <SelectItem value="last-month">Last Month</SelectItem>
                        <SelectItem value="last-quarter">Last Quarter</SelectItem>
                        <SelectItem value="last-year">Last Year</SelectItem>
                        <SelectItem value="custom">Custom Range</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-300">Format</label>
                    <Select defaultValue="pdf">
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-white mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-700 border-slate-600">
                        <SelectItem value="pdf">PDF Document</SelectItem>
                        <SelectItem value="xlsx">Excel Spreadsheet</SelectItem>
                        <SelectItem value="pptx">PowerPoint</SelectItem>
                        <SelectItem value="html">Web Report</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-300">Include Sections</label>
                    <div className="mt-2 space-y-2">
                      <label className="flex items-center text-sm text-slate-300">
                        <input type="checkbox" defaultChecked className="mr-2" />
                        Risk Assessment Summary
                      </label>
                      <label className="flex items-center text-sm text-slate-300">
                        <input type="checkbox" defaultChecked className="mr-2" />
                        Investment Recommendations
                      </label>
                      <label className="flex items-center text-sm text-slate-300">
                        <input type="checkbox" defaultChecked className="mr-2" />
                        Threat Intelligence
                      </label>
                      <label className="flex items-center text-sm text-slate-300">
                        <input type="checkbox" className="mr-2" />
                        Technical Appendix
                      </label>
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={() => generateReport(selectedReport)}
                  disabled={generatingReport}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  {generatingReport ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Generating Report...
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4 mr-2" />
                      Generate Now
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-6">
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Scheduled Reports</CardTitle>
              <CardDescription className="text-slate-400">
                Automated report generation and distribution
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scheduledReports.map((report, index) => (
                  <div key={index} className="p-4 bg-slate-700/30 rounded-lg border border-slate-600">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {(() => {
                          const ReportIcon = getReportIcon(report.type);
                          return <ReportIcon className="h-5 w-5 text-blue-400" />;
                        })()}
                        <div>
                          <h4 className="font-medium text-white">{report.name}</h4>
                          <div className="flex items-center space-x-4 mt-1 text-sm text-slate-400">
                            <div className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              Next: {report.nextRun}
                            </div>
                            <div className="flex items-center">
                              <Mail className="h-3 w-3 mr-1" />
                              {report.recipients.length} recipients
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" className="border-slate-600 text-slate-300">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="border-slate-600 text-slate-300">
                          Run Now
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recent" className="space-y-6">
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Recent Reports</CardTitle>
              <CardDescription className="text-slate-400">
                Previously generated reports and download history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReports.map((report, index) => (
                  <div key={index} className="p-4 bg-slate-700/30 rounded-lg border border-slate-600">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {(() => {
                          const ReportIcon = getReportIcon(report.type);
                          return <ReportIcon className="h-5 w-5 text-blue-400" />;
                        })()}
                        <div>
                          <h4 className="font-medium text-white">{report.name}</h4>
                          <div className="flex items-center space-x-4 mt-1 text-sm text-slate-400">
                            <span>Generated: {report.generatedDate}</span>
                            <span>Size: {report.size}</span>
                            <span>{report.downloads} downloads</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" className="border-slate-600 text-slate-300">
                          <Download className="h-3 w-3 mr-1" />
                          Download
                        </Button>
                        <Button variant="outline" size="sm" className="border-slate-600 text-slate-300">
                          Share
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Reports Generated</p>
                    <p className="text-2xl font-bold text-blue-400">47</p>
                  </div>
                  <FileText className="h-8 w-8 text-blue-400" />
                </div>
                <div className="text-xs text-slate-500 mt-1">This month</div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Total Downloads</p>
                    <p className="text-2xl font-bold text-green-400">1,247</p>
                  </div>
                  <Download className="h-8 w-8 text-green-400" />
                </div>
                <div className="text-xs text-slate-500 mt-1">+23% vs last month</div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Active Schedules</p>
                    <p className="text-2xl font-bold text-purple-400">12</p>
                  </div>
                  <Calendar className="h-8 w-8 text-purple-400" />
                </div>
                <div className="text-xs text-slate-500 mt-1">Automated reports</div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Unique Recipients</p>
                    <p className="text-2xl font-bold text-orange-400">156</p>
                  </div>
                  <Users className="h-8 w-8 text-orange-400" />
                </div>
                <div className="text-xs text-slate-500 mt-1">Across all reports</div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Usage Insights</CardTitle>
              <CardDescription className="text-slate-400">
                Report generation and consumption patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-white mb-3">Most Popular Reports</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Executive Summary</span>
                      <span className="text-blue-400">34%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Technical Assessment</span>
                      <span className="text-green-400">28%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Risk Analysis</span>
                      <span className="text-purple-400">22%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Compliance Report</span>
                      <span className="text-orange-400">16%</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-white mb-3">Peak Usage Times</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Monday 9-11 AM</span>
                      <span className="text-blue-400">High</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Friday 2-4 PM</span>
                      <span className="text-green-400">Medium</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Month-end</span>
                      <span className="text-purple-400">Peak</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Quarter-end</span>
                      <span className="text-red-400">Critical</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReportingTools;
