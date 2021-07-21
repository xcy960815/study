import parse from './parse-template.js'
const vueTemplate = `
                <div class="div-1 div-2" id="div-3">
                    <h3 name="范特西" age="18">范特西</h3>
                    <ul>
                        <li>七里香</li>
                    </ul> 
                </div>`
const template = parse(vueTemplate)
// console.log('template', template)
