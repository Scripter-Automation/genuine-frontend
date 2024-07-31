import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-signing',
  standalone: true,
  imports: [],
  templateUrl: './signing.component.html',
  styleUrl: './signing.component.css'
})
export class SigningComponent implements OnInit {

  constructor(private router:Router, private sanitizer:DomSanitizer){}
  
  frame_url:string|undefined

  async ngOnInit(): Promise<void> {
    let embed_url = this.router.parseUrl(this.router.url).queryParams['docusign_url']
    embed_url= this.sanitizer.bypassSecurityTrustResourceUrl(embed_url);

    this.frame_url=embed_url;
    /**
     * The following code IS NOT depricated, this code was intended to create the focused view of docusign, however
     * many people are reporting the same issue and docusing said in the documentation this is not a real error, however
     * using it this way will cause the document to never render at all so the previous sub optimal implementation was pefered
     * however the best way to do this is through focused view
     * 
     *
     * 
    const docusign = await (window as any).DocuSign.loadDocuSign(environment.docusignConfig.integrationKey)
    const sign = docusign.signing({
      url:embed_url,
      displayFormat:"focused",
    })
    console.log("sign: ", sign)
    sign.mount("#docusignContainer") 
     * 
     */
    
  }
  

}
