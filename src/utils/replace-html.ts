import * as  path from 'path';
import * as fs  from 'fs';
export class ReplaceHtmlDTO {
    readonly name?: string;
    readonly date?: string;
    readonly text?: string;
    readonly type?: string;
}
export const replaceHtml = async (params:ReplaceHtmlDTO)=>{
    let html
    if (params.type === 'created'){
         html = fs.readFileSync(path.join(__dirname,'..', 'templates', 'emails','created.html'), { encoding: 'utf-8' });
        html = html.replace(/{{PATIENT}}/g, `${params.name}`);
    }


    return html;
}