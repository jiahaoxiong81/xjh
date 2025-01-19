document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const submitBtn = contactForm.querySelector('.submit-btn');
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // 显示加载状态
        submitBtn.classList.add('loading');
        
        // 获取表单数据
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());
        
        try {
            // 这里添加实际的表单提交逻辑
            // 例如: 发送到后端API或邮件服务
            await simulateFormSubmission(data);
            
            // 显示成功消息
            showMessage('success', '消息已发送！我会尽快回复您。');
            
            // 重置表单
            contactForm.reset();
        } catch (error) {
            // 显示错误消息
            showMessage('error', '发送失败，请稍后重试。');
        } finally {
            // 移除加载状态
            submitBtn.classList.remove('loading');
        }
    });
});

// 模拟表单提交
function simulateFormSubmission(data) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Form submitted:', data);
            resolve();
        }, 2000);
    });
}

// 显示消息
function showMessage(type, text) {
    // 移除现有消息
    const existingMessage = document.querySelector('.success-message, .error-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // 创建新消息
    const message = document.createElement('div');
    message.className = `${type}-message`;
    message.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${text}</span>
    `;
    
    // 添加到表单后面
    document.querySelector('.contact-form').appendChild(message);
    
    // 3秒后自动移除
    setTimeout(() => {
        message.remove();
    }, 3000);
}

// 表单验证
function validateForm() {
    const inputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            showInputError(input, '此字段不能为空');
        } else if (input.type === 'email' && !isValidEmail(input.value)) {
            isValid = false;
            showInputError(input, '请输入有效的邮箱地址');
        } else {
            removeInputError(input);
        }
    });
    
    return isValid;
}

// 显示输入错误
function showInputError(input, message) {
    const formGroup = input.closest('.form-group');
    const error = formGroup.querySelector('.error-text') || document.createElement('span');
    error.className = 'error-text';
    error.textContent = message;
    
    if (!formGroup.querySelector('.error-text')) {
        formGroup.appendChild(error);
    }
    
    input.classList.add('error');
}

// 移除输入错误
function removeInputError(input) {
    const formGroup = input.closest('.form-group');
    const error = formGroup.querySelector('.error-text');
    
    if (error) {
        error.remove();
    }
    
    input.classList.remove('error');
}

// 验证邮箱
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
} 