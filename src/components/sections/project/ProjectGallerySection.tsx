import ProjectGallery from "@/components/projects/ProjectGallery";
import SectionReveal from "@/components/sections/project/SectionReveal";

type ProjectGallerySectionProps = {
  title: string;
  images: string[];
  blurDataURL?: string;
};

export default function ProjectGallerySection({
  title,
  images,
  blurDataURL,
}: ProjectGallerySectionProps) {
  const galleryImages = images.filter((image) => image.length > 0);
  if (galleryImages.length === 0) {
    return null;
  }

  return (
    <SectionReveal>
      <ProjectGallery title={title} images={galleryImages} blurDataURL={blurDataURL} />
    </SectionReveal>
  );
}
