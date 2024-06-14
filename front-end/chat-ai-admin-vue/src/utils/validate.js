export function validatePassword(password) {
  if (password.length < 6 || password.length > 32) {
    return false; // 密码长度不在6-32位之间  
  }

  // 定义用于检查不同类型字符的正则表达式  
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*()\-_=+{};:,<.>]/.test(password); // 这里只列出了一些常见的特殊字符，你可以根据需要添加更多  

  // 确保密码包含至少两种不同类型的字符  
  const hasTwoTypes = (
    (hasLetter && hasNumber) ||
    (hasLetter && hasSpecialChar) ||
    (hasNumber && hasSpecialChar)
  );

  return hasTwoTypes;
}  