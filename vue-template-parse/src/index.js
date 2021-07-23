import parse from './parse-template.js'
const vueTemplate = `
                <div class="div-1 div-2" id="div-3">
                    <h3 name="范特西" age="18">范特西</h3>
                    <ul>
                        <li>七里香</li>
                    </ul> 
                </div>`
const template = parse(vueTemplate)

function syntaxHighlight(json) {
    if (typeof json != 'string') {
        json = JSON.stringify(json, undefined, 2)
    }
    json = json.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>')
    return json.replace(
        /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
        function (match) {
            var cls = 'number'
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = 'key'
                } else {
                    cls = 'string'
                }
            } else if (/true|false/.test(match)) {
                cls = 'boolean'
            } else if (/null/.test(match)) {
                cls = 'null'
            }
            return '<span class="' + cls + '">' + match + '</span>'
        }
    )
}

const originalTemplates = document.getElementById('original-templates')
const newTemplates = document.getElementById('new-templates')
originalTemplates.innerText = vueTemplate
newTemplates.innerHTML = syntaxHighlight(template)
