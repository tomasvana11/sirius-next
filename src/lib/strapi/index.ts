export { STRAPI_CONFIG, strapiRequest } from "./config";

export type {
  StrapiResponse,
  RichTextNode,
  TopBar,
  Homepage,
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
} from "./types";

export {
  getTopBar,
  getHomepage,
  getBlogPosts,
  getBlogPost,
  getAboutPage,
  getSocialMedia,
  getCareerBanner,
  submitContactForm,
  getFormBanner,
  getBlogs,
  getBlogBySlug,
} from "./services";

// Utility funkce
export { renderRichText } from "./utils";