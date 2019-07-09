import CMS from 'netlify-cms';
import 'netlify-cms/dist/cms.css';
import BlogPreview from './blog-preview';

CMS.registerPreviewStyle('/admin/blog-preview.css');
CMS.registerPreviewTemplate('blog', BlogPreview);
