export { STRAPI_CONFIG, strapiRequest } from "./config";

export type {
  StrapiResponse,
  RichTextNode,
  TopBar,
  Homepage,
  BlogPage,
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
  getBlogPage,
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