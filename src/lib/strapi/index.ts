export { STRAPI_CONFIG, strapiRequest } from "./config";

export type {
  StrapiResponse,
  RichTextNode,
  TopBar,
  Homepage,
  BlogPage,
  ContactPage,
  ReferencePage,
  ClientPage,
  OnasPage,
  CareerPage,
  ProjectsPage,
  SocialMedia,
  SocialMediaLink,
  SocialMediaPlatform,
  CareerBanner,
  CareerBannerLink,
  ContactFormData,
  ContactFormSubmission,
  FormBanner,
  BlogPost,
  BlogsResponse,
  StrapiImage,
  StrapiImageFormat,
  Project,ProjectsResponse, TeamMember
} from "./types";

export {
  getTopBar,
  getHomepage,
  getBlogPage,
  getProjectsPage,
  getContactPage,
  getReferencePage,
  getClientPage,
  getOnasPage,
  getCareerPage,
  getBlogPosts,
  getBlogPost,
  getAboutPage,
  getSocialMedia,
  getCareerBanner,
  submitContactForm,
  getFormBanner,
  getBlogs,
  getBlogBySlug,
  getProjects
} from "./services";

// Utility funkce
export { renderRichText } from "./utils";