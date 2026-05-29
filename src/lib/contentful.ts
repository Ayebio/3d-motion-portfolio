import { createClient, type EntrySkeletonType } from "contentful"

import { fallbackProjects, type PortfolioImage, type PortfolioProject } from "@/data/projects"

interface PortfolioEntryFields {
  title?: string
  slug?: string
  role?: string
  year?: string
  videoUrl?: string
  description?: string
  tags?: string[]
  highResImages?: unknown[]
}

type PortfolioEntrySkeleton = EntrySkeletonType<PortfolioEntryFields, "portfolioEntry">

interface ContentfulAssetShape {
  fields?: {
    title?: string
    description?: string
    file?: {
      url?: string
      details?: {
        image?: {
          width?: number
          height?: number
        }
      }
    }
  }
}

function hasContentfulCredentials() {
  return Boolean(import.meta.env.CONTENTFUL_SPACE_ID && import.meta.env.CONTENTFUL_ACCESS_TOKEN)
}

function getContentfulClient() {
  if (!hasContentfulCredentials()) {
    return null
  }

  return createClient({
    space: import.meta.env.CONTENTFUL_SPACE_ID as string,
    accessToken: import.meta.env.CONTENTFUL_ACCESS_TOKEN as string,
    environment: import.meta.env.CONTENTFUL_ENVIRONMENT || "master",
  })
}

function normalizeAsset(asset: unknown): PortfolioImage | null {
  const contentfulAsset = asset as ContentfulAssetShape
  const file = contentfulAsset.fields?.file
  const sourceUrl = file?.url

  if (!sourceUrl) {
    return null
  }

  const url = sourceUrl.startsWith("//") ? `https:${sourceUrl}` : sourceUrl

  return {
    src: url,
    alt:
      contentfulAsset.fields?.description ||
      contentfulAsset.fields?.title ||
      "3D 产品动态设计作品图像",
    width: file.details?.image?.width || 1600,
    height: file.details?.image?.height || 1000,
  }
}

function normalizeEntry(fields: PortfolioEntryFields, index: number): PortfolioProject {
  const fallback = fallbackProjects[index % fallbackProjects.length]
  const images = fields.highResImages?.map(normalizeAsset).filter((image): image is PortfolioImage => Boolean(image))

  return {
    title: fields.title || fallback.title,
    slug: fields.slug || fallback.slug,
    role: fields.role || fallback.role,
    year: fields.year || fallback.year,
    videoUrl: fields.videoUrl || fallback.videoUrl,
    description: fields.description || fallback.description,
    tags: fields.tags?.length ? fields.tags : fallback.tags,
    images: images?.length ? images : fallback.images,
  }
}

export async function getPortfolioEntries(): Promise<PortfolioProject[]> {
  const client = getContentfulClient()

  if (!client) {
    return fallbackProjects
  }

  try {
    const response = await client.getEntries<PortfolioEntrySkeleton>({
      content_type: "portfolioEntry",
      include: 2,
      limit: 50,
    })

    if (!response.items.length) {
      return fallbackProjects
    }

    return response.items.map((item, index) => normalizeEntry(item.fields, index))
  } catch (error) {
    console.warn("Contentful 数据读取失败，已使用本地占位作品。", error)
    return fallbackProjects
  }
}

export async function getProjectBySlug(slug: string): Promise<PortfolioProject | undefined> {
  const projects = await getPortfolioEntries()
  return projects.find((project) => project.slug === slug)
}
