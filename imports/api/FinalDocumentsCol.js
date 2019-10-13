import { FilesCollection } from 'meteor/ostrio:files';
import {Meteor} from "meteor/meteor";

const FinalDocuments = new FilesCollection({
    storagePath: 'C:\\finaldocuments',
    downloadRoute: '/files/finaldocuments',
    collectionName: 'finaldocuments',
    permissions: 0o755,
    allowClientCode: false,
    cacheControl: 'public, max-age=31536000',
    // Read more about cacheControl: https://devcenter.heroku.com/articles/increasing-application-performance-with-http-cache-headers
    onbeforeunloadMessage() {
        return 'Si abandona la página, el documento no se creará.';
    },
    onBeforeUpload(file) {
        // Allow upload files under 10MB, and only in png/jpg/jpeg formats
        // Note: You should never trust to extension and mime-type here
        // as this data comes from client and can be easily substitute
        // to check file's "magic-numbers" use `mmmagic` or `file-type` package
        // real extension and mime-type can be checked on client (untrusted side)
        // and on server at `onAfterUpload` hook (trusted side)
        if (file.size <= 10485760 && /doc|docx/i.test(file.ext)) {
            return true;
        }
        return 'Sólo se permiten archivos doc y docx';
    },
    downloadCallback(fileObj) {
        if (this.params.query.download == 'true') {
            // Increment downloads counter
            FinalDocuments.update(fileObj._id, {$inc: {'meta.downloads': 1}});
        }
        // Must return true to continue download
        return true;
    }
});

if (Meteor.isClient) {
    Meteor.subscribe('finaldocuments');
}

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('finaldocuments', function () {
        return FinalDocuments.find().cursor;
    });
}

// Export FilesCollection instance, so it can be imported in other files
export default FinalDocuments;