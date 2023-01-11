import { createElement } from 'preact';
import { useContext, useCallback } from 'preact/hooks';
import { IntlContext } from 'preact-i18n';
import { compose } from 'recompose';
import { withIntl } from '../../enhancers';
//import dompurify from 'dompurify';

//dompurify shim is not released yet...

function createMore(props, context) {
   const { intl } = useContext(IntlContext);
   const zimletStrings = intl.dictionary['zimbra-zimlet-signature-image'];
   const insertImageHandler = useCallback(() => {
      insertImage(props, context, zimletStrings)
   }, [props, context, zimletStrings]);

   if (props.editorType === 'signature') {
      return (<span><input type="file" title={zimletStrings.menuItem} name="signatureImageFileInput" class="zimbra-zimlet-signature-image" onChange={insertImageHandler} accept="image/gif, image/jpeg, image/png" /></span>);
   }
}

function insertImage(props, context, zimletStrings) {
   let fileInputs = window.parent.document.getElementsByClassName('zimbra-zimlet-signature-image');//.files[0];
   let file;
   for (var i = 0; i < fileInputs.length; i++) {
      if(fileInputs[i].files.length > 0)
      {
         file = fileInputs[i].files[0];
      }
   }
   var reader = new FileReader();
   reader.readAsDataURL(file);
   reader.onloadend = function () {
      let content = props.getComposer().getContent();
      //props.getComposer().setContent(dompurify.sanitize(content) + '<img src="' + dompurify.sanitize(reader.result) + '">');
      props.getComposer().setContent(content + '<img src="' +reader.result + '">');
      for (var i = 0; i < fileInputs.length; i++) {
         fileInputs[i].value=""; //In case the user re-tries the same image, we want the onChange to fire.
      }
   }
}

export default compose(withIntl())(createMore)
