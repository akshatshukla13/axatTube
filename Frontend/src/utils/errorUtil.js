const parseAxiosError = (data) => {
  // Parse the HTML string
  const parser = new DOMParser();
  const doc = parser.parseFromString(data, "text/html");

  // Find the <pre> tag and get its HTML content
  const preTag = doc.querySelector("pre");
  let errorMessage = preTag ? preTag.innerHTML : "Error message not found";

  // Replace <br> tags with newline characters
  errorMessage = errorMessage.replace(/<br\s*\/?>/gi, "\n");

  // Extract the first line of the error message
  errorMessage = errorMessage.split("\n")[0].trim();

  return errorMessage;
};

export default parseAxiosError