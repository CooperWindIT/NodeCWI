const { google } = require('googleapis');
const { Readable } = require('stream');

class StorageService {
  constructor(provider = 'google') {
    this.provider = provider;
  }

  async upload(buffer, fileName) {
    switch (this.provider) {
      case 'google':
        return this._uploadToGoogleDrive(buffer, fileName);
      case 'aws':
        return this._uploadToS3(buffer, fileName);
      default:
        throw new Error('Unsupported storage provider');
    }
  }
  async delete(fileId) {
    switch (this.provider) {
      case 'google':
        return this._deleteFromGoogleDrive(fileId);
      case 'aws':
        return this._deleteFromS3(fileId);
      default:
        throw new Error('Unsupported storage provider');
    }
  }

  async _deleteFromGoogleDrive(fileId) {
    const auth = this._getGoogleAuth();
    const drive = google.drive({ version: 'v3', auth });

    try {
      await drive.files.delete({
        fileId: fileId,
      });
      console.log(`File with ID ${fileId} deleted successfully.`);
      return { success: true, message: 'File deleted successfully' };
    } catch (error) {
      console.error('Error deleting file:', error.message);
      return { success: false, message: error.message };
    }
  }

  async _uploadToGoogleDrive(buffer, fileName) {
    const auth = this._getGoogleAuth();
    const drive = google.drive({ version: 'v3', auth });

    const fileMetadata = {
      name: fileName,
      parents:["1jkWo4VucaL9aNyLl4Ad8hqGGvQvec9a1"]
    };

    const media = {
      mimeType: 'image/webp',
      body: Readable.from(buffer),
    };

    const response = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: 'id',
    });

    // Share the file with your personal Google account
    //await this._shareFileWithUser(drive, response.data.id, 'solutionscharat@gmail.com');

    return {
      fileId: response.data.id,
      url: `https://drive.google.com/uc?export=view&id=${response.data.id}`,
      provider: 'google',
    };
  }

  async _shareFileWithUser(drive, fileId, emailAddress) {
    try {
      await drive.permissions.create({
        fileId: fileId,
        requestBody: {
          type: 'user',
          role: 'reader',
          emailAddress: emailAddress,
        },
      });
      console.log(`File shared with ${emailAddress}`);
    } catch (error) {
      console.error('Error sharing file:', error);
    }
  }

  _getGoogleAuth() {
    return new google.auth.GoogleAuth({
      keyFile: 'cwi-goggle-creds.json',
      scopes: ['https://www.googleapis.com/auth/drive'],
    });
  }
}

module.exports = StorageService;
