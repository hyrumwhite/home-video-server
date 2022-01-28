export const formUpload = ({
	url,
	method,
	formData,
	onUploadProgress,
	onDownloadProgress,
}) =>
	new Promise((resolve, reject) => {
		const request = new XMLHttpRequest();
		if (onUploadProgress) {
			request.upload.addEventListener("progress", (event) => {
				if (event.lengthComputable) {
					onUploadProgress((event.loaded / event.total) * 100);
				}
			});
		}
		if (onDownloadProgress) {
			request.addEventListener("progress", (event) => {
				if (event.lengthComputable) {
					onDownloadProgress((event.loaded / event.total) * 100);
				}
			});
		}
		request.addEventListener("loadend", () => {
			if (request.readyState === XMLHttpRequest.DONE) {
				if (request.status >= 200 && request.status < 300) {
					try {
						resolve(JSON.parse(request.responseText));
					} catch (e) {
						resolve(request.responseText);
					}
				} else {
					reject(request);
				}
			}
		});
		request.open(method, url, true);
		request.setRequestHeader("Content-Type", "multi-part/form-data");
		request.send(formData);
	});
