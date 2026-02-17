// services/api/index.ts
export { authApi } from './auth';
export { logApi } from './logs';
export { alertApi } from './alerts';
export { analyticsApi } from './analytics';
export { aiApi } from './ai';
export { default as apiClient } from './client';

// Add new role-specific APIs
export const adminApi = {
  // Super Admin specific endpoints
  getSystemHealth: () => apiClient.get('/admin/system/health'),
  getOrganizations: (params) => apiClient.get('/admin/organizations', { params }),
  getOrganizationDetails: (id) => apiClient.get(`/admin/organizations/${id}`),
  updateOrganization: (id, data) => apiClient.put(`/admin/organizations/${id}`, data),
  getGlobalLogs: (params) => apiClient.get('/admin/logs', { params }),
  getAuditLogs: (params) => apiClient.get('/admin/audit', { params }),
  getBillingInfo: () => apiClient.get('/admin/billing'),
  getSystemMetrics: () => apiClient.get('/admin/metrics'),
};

export const orgApi = {
  // Organization Admin specific endpoints
  getTeamMembers: (params) => apiClient.get('/org/team', { params }),
  inviteMember: (data) => apiClient.post('/org/invites', data),
  updateMemberRole: (id, role) => apiClient.put(`/org/team/${id}/role`, { role }),
  removeMember: (id) => apiClient.delete(`/org/team/${id}`),
  getLogSources: () => apiClient.get('/org/log-sources'),
  addLogSource: (data) => apiClient.post('/org/log-sources', data),
  updateLogSource: (id, data) => apiClient.put(`/org/log-sources/${id}`, data),
  getApiKeys: () => apiClient.get('/org/api-keys'),
  createApiKey: (data) => apiClient.post('/org/api-keys', data),
  revokeApiKey: (id) => apiClient.delete(`/org/api-keys/${id}`),
  getOrgSettings: () => apiClient.get('/org/settings'),
  updateOrgSettings: (data) => apiClient.put('/org/settings', data),
};

export const securityApi = {
  // Security Analyst specific endpoints
  getThreats: (params) => apiClient.get('/security/threats', { params }),
  getIncidents: (params) => apiClient.get('/security/incidents', { params }),
  getIncidentDetails: (id) => apiClient.get(`/security/incidents/${id}`),
  updateIncidentStatus: (id, status) => apiClient.patch(`/security/incidents/${id}`, { status }),
  getThreatIntelligence: () => apiClient.get('/security/threat-intel'),
  getIOCs: (params) => apiClient.get('/security/iocs', { params }),
  addIOC: (data) => apiClient.post('/security/iocs', data),
  runThreatHunt: (params) => apiClient.post('/security/hunts', params),
  getInvestigationReport: (id) => apiClient.get(`/security/reports/${id}`),
};

export const devopsApi = {
  // DevOps specific endpoints
  getClusters: () => apiClient.get('/devops/clusters'),
  getClusterDetails: (id) => apiClient.get(`/devops/clusters/${id}`),
  getNodes: (clusterId) => apiClient.get(`/devops/clusters/${clusterId}/nodes`),
  getNodeMetrics: (nodeId) => apiClient.get(`/devops/nodes/${nodeId}/metrics`),
  getDeployments: (params) => apiClient.get('/devops/deployments', { params }),
  triggerDeployment: (data) => apiClient.post('/devops/deployments', data),
  getSystemMetrics: (params) => apiClient.get('/devops/metrics', { params }),
  getLogStream: (filters) => apiClient.get('/devops/logs/stream', { params: filters }),
  getServiceHealth: () => apiClient.get('/devops/health'),
  getPerformanceAlerts: () => apiClient.get('/devops/alerts'),
};

export const viewerApi = {
  // Viewer specific endpoints (read-only)
  getSharedDashboards: () => apiClient.get('/viewer/dashboards'),
  getDashboardDetails: (id) => apiClient.get(`/viewer/dashboards/${id}`),
  getReports: (params) => apiClient.get('/viewer/reports', { params }),
  getReportDetails: (id) => apiClient.get(`/viewer/reports/${id}`),
  exportReport: (id, format) => apiClient.get(`/viewer/reports/${id}/export`, { 
    params: { format },
    responseType: 'blob'
  }),
  getSharedAnalytics: (params) => apiClient.get('/viewer/analytics', { params }),
};