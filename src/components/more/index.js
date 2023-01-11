import { createElement } from 'preact';
import { useContext, useCallback } from 'preact/hooks';
import { IntlContext } from 'preact-i18n';
import { compose } from 'recompose';
import { withIntl } from '../../enhancers';

function createMore(props, context) {
   const { intl } = useContext(IntlContext);
   const zimletStrings = intl.dictionary['zimbra-zimlet-signature-image'];
   const insertImageHandler = useCallback(() => {
      insertImage(props, context, zimletStrings)
   }, [props, context, zimletStrings]);

   if (props.editorType === 'signature') {
      return (<span><input type="file" title={zimletStrings.menuItem} name="signatureImageFileInput" id="signatureImageFileInput" class="zimbra-zimlet-signature-image" onChange={insertImageHandler} accept="image/gif, image/jpeg, image/png" /></span>);
   }
}

function insertImage(props, context, zimletStrings) {
   let file = window.parent.document.getElementById('signatureImageFileInput').files[0];
   window.parent.document.getElementById('signatureImageFileInput').value=""; //In case the user re-tries the same image, we want the onChange to fire.
   var reader = new FileReader();
   reader.readAsDataURL(file);
   reader.onload = function () {
      let content = props.getComposer().getContent();
      console.log(content);
      props.getComposer().setContent(content + '<img src="' + reader.result + '">');
      console.log(reader.result);
   }
}

export default compose(withIntl())(createMore)
