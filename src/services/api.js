/**
 * API Service
 * Centralized service for all API calls to the backend
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

/**
 * Generic fetch wrapper with error handling
 * @param {string} endpoint - API endpoint path
 * @param {RequestInit} options - Fetch options
 * @returns {Promise<Object>} API response
 */
async function apiFetch(endpoint, options) {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || `HTTP ${response.status}: ${response.statusText}`,
        details: data.details,
      };
    }

    return data;
  } catch (error) {
    console.error('[API Error]', endpoint, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error',
    };
  }
}

/**
 * About Section API
 * @returns {Promise<Object>} About section data
 */
export async function getAbout() {
  return apiFetch('/api/about');
}

/**
 * Projects API
 * @param {Object} params - Query parameters
 * @param {boolean} params.featured - Filter by featured projects
 * @returns {Promise<Object>} Projects data
 */
export async function getProjects(params) {
  const queryParams = new URLSearchParams();
  if (params?.featured) {
    queryParams.set('featured', 'true');
  }
  
  const query = queryParams.toString();
  return apiFetch(`/api/projects${query ? `?${query}` : ''}`);
}

/**
 * Get project by slug
 * @param {string} slug - Project slug
 * @returns {Promise<Object>} Project data
 */
export async function getProjectBySlug(slug) {
  return apiFetch(`/api/projects/${slug}`);
}

/**
 * Certifications API
 * @param {Object} params - Query parameters
 * @param {boolean} params.featured - Filter by featured certifications
 * @returns {Promise<Object>} Certifications data
 */
export async function getCertifications(params) {
  const queryParams = new URLSearchParams();
  if (params?.featured) {
    queryParams.set('featured', 'true');
  }
  
  const query = queryParams.toString();
  return apiFetch(`/api/certifications${query ? `?${query}` : ''}`);
}

/**
 * Get certification by ID
 * @param {string} id - Certification ID
 * @returns {Promise<Object>} Certification data
 */
export async function getCertificationById(id) {
  return apiFetch(`/api/certifications/${id}`);
}

/**
 * Contact API
 * @param {Object} message - Contact message data
 * @param {string} message.name - Sender name
 * @param {string} message.email - Sender email
 * @param {string} message.message - Message content
 * @param {string} [message.subject] - Message subject (optional)
 * @returns {Promise<Object>} Response with message ID
 */
export async function sendContactMessage(message) {
  return apiFetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(message),
  });
}

/**
 * Export all services
 */
export const api = {
  getAbout,
  getProjects,
  getProjectBySlug,
  getCertifications,
  getCertificationById,
  sendContactMessage,
};

export default api;
