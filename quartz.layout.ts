import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/jackyzha0/quartz",
      "Discord Community": "https://discord.gg/cRFFHYye7t",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    Component.Explorer({
      title: "",
      sortFn: (a, b) => {
        const order = new Map<string, number>([
          ["welcome to my site!", 0],
          ["my working experiences", 1],
          ["my academic experiences", 2],
          ["my short poems", 3],
          ["videos and others", 4],
          ["short poems", 5],
        ])
        const an = (a.displayName ?? "").toLowerCase()
        const bn = (b.displayName ?? "").toLowerCase()
        const ra = order.get(an)
        const rb = order.get(bn)
        if (ra !== undefined && rb !== undefined) return ra - rb
        if (ra !== undefined) return -1
        if (rb !== undefined) return 1
        return an.localeCompare(bn, undefined, { numeric: true, sensitivity: "base" })
      },
    }),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer({
      title: "",
      sortFn: (a, b) => {
        const order = new Map<string, number>([
          ["welcome to my site!", 0],
          ["my working experiences", 1],
          ["my academic experiences", 2],
          ["my short poems", 3],
          ["videos and others", 4],
          ["short poems", 5],
        ])
        const an = (a.displayName ?? "").toLowerCase()
        const bn = (b.displayName ?? "").toLowerCase()
        const ra = order.get(an)
        const rb = order.get(bn)
        if (ra !== undefined && rb !== undefined) return ra - rb
        if (ra !== undefined) return -1
        if (rb !== undefined) return 1
        return an.localeCompare(bn, undefined, { numeric: true, sensitivity: "base" })
      },
    }),
  ],
  right: [],
}

