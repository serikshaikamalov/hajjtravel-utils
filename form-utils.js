export const toFormData = (data) => {
    const fd = new FormData();

    if (data) {
        Object.entries(data).forEach(([key, value]) => {
            console.log(key, value);
            if (value instanceof FileList) {
                if (value?.length > 0) {
                    fd.append(key, value[0]);
                }
            } else {
                fd.append(key, value);
            }
        });
    }

    return fd;
};
