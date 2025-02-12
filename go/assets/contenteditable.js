document.addEventListener('alpine:init', () => {
  window.Alpine.store('contenteditable', {
    savedSelection: null,
    textareaRef: null,
    variables: [],
    message: '',

    saveSelection() {
      const selection = window.getSelection()
      if (selection.rangeCount) {
        this.savedSelection = selection.getRangeAt(0)
      } else {
        this.savedSelection = null
      }
    },

    restoreSelection() {
      if (!this.savedSelection) return

      const selection = window.getSelection()
      selection.removeAllRanges()
      selection.addRange(this.savedSelection)
    },

    async focusTextarea() {
      this.saveSelection()
      await window.Alpine.nextTick()
      const textarea = this.textareaRef
      textarea.focus()
      this.restoreSelection()
    },

    async handleMessageInput() {
      const rawText = this.textareaRef.innerHTML

      const parsedText = rawText
        .replace(/&nbsp;/g, ' ')
        .replace(/\u00a0/g, ' ')
        .replace(/<div[^>]*>([\s\S]*?)<\/div>/g, '\n$1')
        .replace(/<br[^>]*>/g, '\n')
        .replace(/<span class="tag" contenteditable="false">(.*?)<\/span>/g, (_, label) => {
          const variable = this.variables.find((v) => v.label === label)
          return variable.value || label
        })
        .replace(/<span[^>]*>([\s\S]*?)<\/span>/g, '$1')
      this.message = parsedText

      // If tag has been introduced manually we need to refresh the content
      if (rawText.match(/\{\{\.([^}]+?)\}\}/g)) {
        // TODO: Selection is restored to a wrong point because after new parsing
        // there are different nodes and offsets does not match
        // we need to find a hack for this.
        this.saveSelection()
        this.textareaRef.innerHTML = this.parseMessage(parsedText)
        this.restoreSelection()
      }
    },

    parseMessage(message) {
      return message.replace(/\n/g, '<br>').replace(/\{\{\.(.*?)\}\}/g, (_, value) => {
        const variable = this.variables.find((v) => v.value === `{{.${value}}}`)
        return variable
          ? `<span class="tag" contenteditable="false">${variable.label}</span>`
          : `{{.${value}}}`
      })
    },

    insertVariable(variable) {
      this.focusTextarea()
      const textarea = this.textareaRef

      // If saved selection is part of the textarea
      if (this.savedSelection && textarea.contains(this.savedSelection.commonAncestorContainer)) {
        this.restoreSelection()
      } else {
        // If not we set the cursor to the end of the textarea
        const range = document.createRange()
        const selection = window.getSelection()
        range.setStart(textarea, textarea.childNodes.length)
        range.collapse(true)
        selection.removeAllRanges()
        selection.addRange(range)
      }

      // We replace the current selection with the new variable
      const sel = window.getSelection()
      const rang = sel.getRangeAt(0)
      rang.deleteContents()
      var textNode = document.createElement('span')
      textNode.innerText = variable.label
      textNode.classList.add('tag')
      textNode.setAttribute('contenteditable', false)
      rang.insertNode(textNode)
      // Set the cursor right next to the new tag
      rang.collapse(false)
      sel.removeAllRanges()
      sel.addRange(rang)

      // We update the parsed message
      this.handleMessageInput()
    }
  })
})
