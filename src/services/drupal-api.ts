// Servicio para conectar con Drupal Headless CMS
const DRUPAL_API_BASE = import.meta.env.VITE_DRUPAL_API_URL || 'https://conexos.es/jsonapi';

export interface DrupalNode {
  type: string;
  id: string;
  attributes: {
    title: string;
    created: string;
    changed: string;
    [key: string]: any;
  };
  relationships?: {
    [key: string]: {
      data: {
        type: string;
        id: string;
      };
    };
  };
}

export interface DrupalResponse {
  data: DrupalNode[];
  included?: DrupalNode[];
  links?: {
    next?: { href: string };
    prev?: { href: string };
  };
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  price: string;
  ctaText: string;
  ctaLink: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string;
  image: string;
  testimonial: string;
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio: string;
  photo: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
  expertise: string[];
}

export interface Homepage {
  heroTitle: string;
  heroSubtitle: string;
  heroCtaText: string;
  heroCtaLink: string;
  stats: {
    leads: number;
    satisfaction: number;
    projects: number;
    experience: number;
  };
  featuredServices: string[];
}

class DrupalAPI {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string = DRUPAL_API_BASE) {
    this.baseURL = baseURL;
  }

  // Autenticación OAuth2
  async authenticate(clientId: string, clientSecret: string): Promise<void> {
    try {
      const response = await fetch(`${this.baseURL}/oauth/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: clientId,
          client_secret: clientSecret,
        }),
      });

      if (!response.ok) {
        throw new Error('Error de autenticación');
      }

      const data = await response.json();
      this.token = data.access_token;
    } catch (error) {
      console.error('Error de autenticación:', error);
      throw error;
    }
  }

  // Headers para las peticiones
  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/vnd.api+json',
      'Accept': 'application/vnd.api+json',
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    return headers;
  }

  // Obtener servicios
  async getServices(): Promise<Service[]> {
    try {
      const response = await fetch(
        `${this.baseURL}/jsonapi/node/service?include=field_icon`,
        {
          headers: this.getHeaders(),
        }
      );

      if (!response.ok) {
        throw new Error('Error al obtener servicios');
      }

      const data: DrupalResponse = await response.json();
      
      return data.data.map(node => ({
        id: node.id,
        title: node.attributes.title,
        description: node.attributes.field_description?.value || '',
        icon: node.attributes.field_icon?.value || '',
        features: node.attributes.field_features?.value || [],
        price: node.attributes.field_price?.value || '',
        ctaText: node.attributes.field_cta_text?.value || '',
        ctaLink: node.attributes.field_cta_link?.value || '',
      }));
    } catch (error) {
      console.error('Error al obtener servicios:', error);
      return [];
    }
  }

  // Obtener casos de estudio
  async getCaseStudies(): Promise<CaseStudy[]> {
    try {
      const response = await fetch(
        `${this.baseURL}/jsonapi/node/case_study?include=field_image`,
        {
          headers: this.getHeaders(),
        }
      );

      if (!response.ok) {
        throw new Error('Error al obtener casos de estudio');
      }

      const data: DrupalResponse = await response.json();
      
      return data.data.map(node => ({
        id: node.id,
        title: node.attributes.title,
        client: node.attributes.field_client?.value || '',
        industry: node.attributes.field_industry?.value || '',
        challenge: node.attributes.field_challenge?.value || '',
        solution: node.attributes.field_solution?.value || '',
        results: node.attributes.field_results?.value || '',
        image: node.attributes.field_image?.value || '',
        testimonial: node.attributes.field_testimonial?.value || '',
      }));
    } catch (error) {
      console.error('Error al obtener casos de estudio:', error);
      return [];
    }
  }

  // Obtener equipo
  async getTeam(): Promise<TeamMember[]> {
    try {
      const response = await fetch(
        `${this.baseURL}/jsonapi/node/team_member?include=field_photo`,
        {
          headers: this.getHeaders(),
        }
      );

      if (!response.ok) {
        throw new Error('Error al obtener equipo');
      }

      const data: DrupalResponse = await response.json();
      
      return data.data.map(node => ({
        id: node.id,
        name: node.attributes.title,
        position: node.attributes.field_position?.value || '',
        bio: node.attributes.field_bio?.value || '',
        photo: node.attributes.field_photo?.value || '',
        socialLinks: node.attributes.field_social_links?.value || {},
        expertise: node.attributes.field_expertise?.value || [],
      }));
    } catch (error) {
      console.error('Error al obtener equipo:', error);
      return [];
    }
  }

  // Obtener página de inicio
  async getHomepage(): Promise<Homepage | null> {
    try {
      const response = await fetch(
        `${this.baseURL}/jsonapi/node/homepage`,
        {
          headers: this.getHeaders(),
        }
      );

      if (!response.ok) {
        throw new Error('Error al obtener página de inicio');
      }

      const data: DrupalResponse = await response.json();
      
      if (data.data.length === 0) {
        return null;
      }

      const node = data.data[0];
      
      return {
        heroTitle: node.attributes.field_hero_title?.value || '',
        heroSubtitle: node.attributes.field_hero_subtitle?.value || '',
        heroCtaText: node.attributes.field_hero_cta_text?.value || '',
        heroCtaLink: node.attributes.field_hero_cta_link?.value || '',
        stats: {
          leads: node.attributes.field_stats?.leads || 500,
          satisfaction: node.attributes.field_stats?.satisfaction || 95,
          projects: node.attributes.field_stats?.projects || 150,
          experience: node.attributes.field_stats?.experience || 24,
        },
        featuredServices: node.attributes.field_featured_services?.value || [],
      };
    } catch (error) {
      console.error('Error al obtener página de inicio:', error);
      return null;
    }
  }

  // Obtener imagen de Drupal
  getImageUrl(fileId: string): string {
    return `${this.baseURL}/sites/default/files/${fileId}`;
  }

  // Crear nodo (para formularios de contacto)
  async createNode(type: string, attributes: any): Promise<DrupalNode | null> {
    try {
      const response = await fetch(`${this.baseURL}/jsonapi/node/${type}`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({
          data: {
            type: `node--${type}`,
            attributes,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`Error al crear ${type}`);
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error(`Error al crear ${type}:`, error);
      return null;
    }
  }

  // Enviar formulario de contacto
  async sendContactForm(formData: {
    name: string;
    email: string;
    company: string;
    message: string;
  }): Promise<boolean> {
    try {
      const node = await this.createNode('contact', {
        title: `Contacto de ${formData.name}`,
        field_name: formData.name,
        field_email: formData.email,
        field_company: formData.company,
        field_message: formData.message,
      });

      return node !== null;
    } catch (error) {
      console.error('Error al enviar formulario de contacto:', error);
      return false;
    }
  }

  // Obtener artículos (blog)
  async getArticles(): Promise<{data: DrupalNode[], included?: DrupalNode[]}> {
    try {
      const response = await fetch(
        `${this.baseURL}/jsonapi/node/article?include=field_image`,
        {
          headers: this.getHeaders(),
        }
      );

      if (!response.ok) {
        throw new Error('Error al obtener artículos');
      }

      const data: DrupalResponse = await response.json();
      return { data: data.data, included: data.included };
    } catch (error) {
      console.error('Error al obtener artículos:', error);
      return { data: [], included: [] };
    }
  }
}

// Instancia singleton
export const drupalAPI = new DrupalAPI();

// Hook personalizado para usar la API
export const useDrupalAPI = () => {
  return {
    getServices: drupalAPI.getServices.bind(drupalAPI),
    getCaseStudies: drupalAPI.getCaseStudies.bind(drupalAPI),
    getTeam: drupalAPI.getTeam.bind(drupalAPI),
    getHomepage: drupalAPI.getHomepage.bind(drupalAPI),
    sendContactForm: drupalAPI.sendContactForm.bind(drupalAPI),
    getImageUrl: drupalAPI.getImageUrl.bind(drupalAPI),
    authenticate: drupalAPI.authenticate.bind(drupalAPI),
    getArticles: drupalAPI.getArticles.bind(drupalAPI),
  };
}; 