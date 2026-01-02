// Advanced TipTap Editor Component
"use client"

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Heading from '@tiptap/extension-heading'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import { Table } from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableHeader from '@tiptap/extension-table-header'
import TableCell from '@tiptap/extension-table-cell'
import TextAlign from '@tiptap/extension-text-align'
import Color from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import Strike from '@tiptap/extension-strike'
import Underline from '@tiptap/extension-underline'
import Blockquote from '@tiptap/extension-blockquote'
import { useState } from 'react'
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  Quote,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Link as LinkIcon,
  Image as ImageIcon,
  Table as TableIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Palette,
  Highlighter,
  Undo,
  Redo,
  Strikethrough
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Toggle } from '@/components/ui/toggle'

interface TipTapEditorProps {
  content: string
  onChange: (content: string) => void
  placeholder?: string
}

export function TipTapEditor({ content, onChange, placeholder = "Start writing..." }: TipTapEditorProps) {
  const [linkUrl, setLinkUrl] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [isLinkPopoverOpen, setIsLinkPopoverOpen] = useState(false)
  const [isImagePopoverOpen, setIsImagePopoverOpen] = useState(false)

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
        blockquote: {
          HTMLAttributes: {
            class: 'border-l-4 border-primary pl-4 italic my-4 text-muted-foreground bg-muted/50 p-4 rounded-r-lg',
          },
        },
      }),
      Underline,
      Strike.configure({
        HTMLAttributes: {
          class: 'line-through',
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 underline hover:text-blue-800 transition-colors',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg shadow-md hover:shadow-lg transition-shadow',
        },
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: 'border border-border rounded-lg overflow-hidden',
        },
      }),
      TableRow,
      TableHeader,
      TableCell.configure({
        HTMLAttributes: {
          class: 'border border-border px-4 py-2',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph', 'listItem', 'list'],
      }),
      Color.configure({
        types: ['textStyle'],
      }),
      Highlight.configure({
        multicolor: true,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      onChange(html)
    },
    editorProps: {
      attributes: {
        class: 'prose prose-lg dark:prose-invert max-w-none min-h-[400px] p-4 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border border-border rounded-lg bg-background',
      },
    },
  })

  const setLink = () => {
    if (linkUrl) {
      editor?.chain().focus().setLink({ href: linkUrl }).run()
      setLinkUrl('')
      setIsLinkPopoverOpen(false)
    }
  }

  const setImage = () => {
    if (imageUrl) {
      editor?.chain().focus().setImage({ src: imageUrl }).run()
      setImageUrl('')
      setIsImagePopoverOpen(false)
    }
  }

  const toggleBold = () => {
    editor?.chain().focus().toggleBold().run()
  }

  const toggleItalic = () => {
    editor?.chain().focus().toggleItalic().run()
  }

  const toggleUnderline = () => {
    editor?.chain().focus().toggleUnderline().run()
  }

  const toggleStrike = () => {
    editor?.chain().focus().toggleStrike().run()
  }

  const toggleCode = () => {
    editor?.chain().focus().toggleCode().run()
  }

  const addTable = () => {
    editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
  }

  if (!editor) {
    return <div className="min-h-[400px] border rounded-lg animate-pulse" />
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="border-b bg-muted/50 p-2 flex flex-wrap gap-1">
        {/* Text Formatting */}
        <div className="flex items-center gap-1">
          <Toggle
            pressed={editor.isActive('bold')}
            onPressedChange={toggleBold}
            size="sm"
          >
            <Bold className="w-4 h-4" />
          </Toggle>
          <Toggle
            pressed={editor.isActive('italic')}
            onPressedChange={toggleItalic}
            size="sm"
          >
            <Italic className="w-4 h-4" />
          </Toggle>
          <Toggle
            pressed={editor.isActive('underline')}
            onPressedChange={toggleUnderline}
            size="sm"
          >
            <UnderlineIcon className="w-4 h-4" />
          </Toggle>
          <Toggle
            pressed={editor.isActive('strike')}
            onPressedChange={toggleStrike}
            size="sm"
          >
            <Strikethrough className="w-4 h-4" />
          </Toggle>
          <Toggle
            pressed={editor.isActive('code')}
            onPressedChange={toggleCode}
            size="sm"
          >
            <Code className="w-4 h-4" />
          </Toggle>
        </div>

        <Separator orientation="vertical" className="mx-1 h-6" />

        {/* Headings */}
        <div className="flex items-center gap-1">
          <Toggle
            pressed={editor.isActive('heading', { level: 1 })}
            onPressedChange={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            size="sm"
          >
            <Heading1 className="w-4 h-4" />
          </Toggle>
          <Toggle
            pressed={editor.isActive('heading', { level: 2 })}
            onPressedChange={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            size="sm"
          >
            <Heading2 className="w-4 h-4" />
          </Toggle>
          <Toggle
            pressed={editor.isActive('heading', { level: 3 })}
            onPressedChange={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            size="sm"
          >
            <Heading3 className="w-4 h-4" />
          </Toggle>
        </div>

        <Separator orientation="vertical" className="mx-1 h-6" />

        {/* Lists */}
        <div className="flex items-center gap-1">
          <Toggle
            pressed={editor.isActive('bulletList')}
            onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
            size="sm"
          >
            <List className="w-4 h-4" />
          </Toggle>
          <Toggle
            pressed={editor.isActive('orderedList')}
            onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
            size="sm"
          >
            <ListOrdered className="w-4 h-4" />
          </Toggle>
          <Toggle
            pressed={editor.isActive('blockquote')}
            onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
            size="sm"
          >
            <Quote className="w-4 h-4" />
          </Toggle>
        </div>

        <Separator orientation="vertical" className="mx-1 h-6" />

        {/* Alignment */}
        <div className="flex items-center gap-1">
          <Toggle
            pressed={editor.isActive({ textAlign: 'left' })}
            onPressedChange={() => editor.chain().focus().setTextAlign('left').run()}
            size="sm"
          >
            <AlignLeft className="w-4 h-4" />
          </Toggle>
          <Toggle
            pressed={editor.isActive({ textAlign: 'center' })}
            onPressedChange={() => editor.chain().focus().setTextAlign('center').run()}
            size="sm"
          >
            <AlignCenter className="w-4 h-4" />
          </Toggle>
          <Toggle
            pressed={editor.isActive({ textAlign: 'right' })}
            onPressedChange={() => editor.chain().focus().setTextAlign('right').run()}
            size="sm"
          >
            <AlignRight className="w-4 h-4" />
          </Toggle>
        </div>

        <Separator orientation="vertical" className="mx-1 h-6" />

        {/* Links & Images */}
        <div className="flex items-center gap-1">
          <Popover open={isLinkPopoverOpen} onOpenChange={setIsLinkPopoverOpen}>
            <PopoverTrigger asChild>
              <Toggle pressed={editor.isActive('link')} size="sm">
                <LinkIcon className="w-4 h-4" />
              </Toggle>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-2">
                <h4 className="font-medium">Add Link</h4>
                <Input
                  placeholder="https://example.com"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                />
                <Button onClick={setLink} size="sm">
                  Add Link
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          <Popover open={isImagePopoverOpen} onOpenChange={setIsImagePopoverOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">
                <ImageIcon className="w-4 h-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-2">
                <h4 className="font-medium">Add Image</h4>
                <Input
                  placeholder="https://example.com/image.jpg"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
                <Button onClick={setImage} size="sm">
                  Add Image
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          <Button variant="outline" size="sm" onClick={addTable}>
            <TableIcon className="w-4 h-4" />
          </Button>
        </div>

        <Separator orientation="vertical" className="mx-1 h-6" />

        {/* History */}
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
          >
            <Undo className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
          >
            <Redo className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Editor Content */}
      <EditorContent
        editor={editor}
        className="min-h-[400px] focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
      />
    </div>
  )
}
