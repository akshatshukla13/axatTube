// Form validation utilities

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  // At least 6 characters
  return password && password.length >= 6;
};

export const validateFullName = (fullName) => {
  return fullName && fullName.trim().length >= 2;
};

export const validateUsername = (username) => {
  // Alphanumeric and underscore, 3-20 characters
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  return usernameRegex.test(username);
};

export const validateVideoTitle = (title) => {
  return title && title.trim().length >= 3 && title.trim().length <= 100;
};

export const validateDescription = (description) => {
  return description && description.trim().length >= 10;
};

export const validatePlaylistName = (name) => {
  return name && name.trim().length >= 2 && name.trim().length <= 50;
};

export const validateComment = (comment) => {
  return comment && comment.trim().length >= 1 && comment.trim().length <= 500;
};

export const validateTweet = (tweet) => {
  return tweet && tweet.trim().length >= 1 && tweet.trim().length <= 280;
};
