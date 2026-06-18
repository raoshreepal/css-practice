# Practical 01: Business Card Design

## 📋 Overview
A professional business card component demonstrating fundamental CSS properties including colors, borders, padding, and box shadows.

## 🎯 Learning Objectives
- Master CSS colors and properties
- Understand box shadow for depth
- Learn padding and margin spacing
- Create hover effects with transform

## 💻 File Structure
```
Practical-01/
├── index.html     (Business card HTML)
└── style.css      (Complete styling)
```

## 🎨 CSS Topics Covered
- **Colors**: Background colors, text colors
- **Borders**: Border properties and styling
- **Padding**: Inner spacing
- **Margin**: Outer spacing
- **Box Shadow**: Depth and elevation effects
- **Transform**: Hover animations
- **Transition**: Smooth effects

## 🌍 Real-World Applications

### **1. LinkedIn Profiles**
Professional cards displaying user information
```
- Profile picture
- Name and title
- Brief bio
- Contact links
```

### **2. Employee Directory**
Staff contact information cards
```
- Employee photo
- Name, position, department
- Email and phone
- Office location
```

### **3. Contact Cards**
Networking and contact management
```
- Business card design
- QR code integration
- Social media links
- Professional details
```

### **4. Team Roster**
Company team member showcase
```
- Team member cards
- Role and experience
- Contact information
- Hover effects

### **5. Customer Testimonials**
Client reference cards
```
- Client logo or photo
- Quote or review
- Company name
- Rating display
```

## 🔧 Key CSS Features

### **Card Container**
```css
.card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  padding: 30px;
  margin: 20px;
}
```

### **Hover Effect**
```css
.card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.2);
}
```

### **Gradient Background**
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

## 📱 Responsive Design

| Breakpoint | Changes |
|-----------|---------|
| Desktop (1024px+) | Full width layout, 3+ cards per row |
| Tablet (768px) | 2 cards per row, adjusted padding |
| Mobile (480px) | Single column, optimized spacing |

## 🚀 How to Use

1. **View the Design**
   - Open `index.html` in browser
   - Hover over cards to see effects

2. **Customize Content**
   - Edit names and titles in HTML
   - Change company information
   - Update email and phone

3. **Modify Colors**
   - Change gradient colors in CSS
   - Adjust text colors for contrast
   - Modify hover effects

4. **Adapt for Projects**
   - Copy HTML structure
   - Customize CSS classes
   - Add your content

## 🎓 Interview Questions

**Q1: What's the difference between padding and margin?**
- Padding: Inner space inside the element
- Margin: Outer space outside the element

**Q2: How does box-shadow work?**
- Creates a shadow effect around elements
- Parameters: offset-x, offset-y, blur-radius, spread-radius, color

**Q3: What's transform: translateY(-10px)?**
- Moves element up by 10 pixels when hovered
- Creates animation effect with smooth transition

## ✏️ Exercises

1. **Change Card Colors**
   - Modify the gradient to use different colors
   - Make each card a different color

2. **Add Icons**
   - Add emoji or icons to cards
   - Position icons next to names

3. **Create Animations**
   - Add rotation on hover
   - Create slide-in animation
   - Add scale effect

4. **Responsive Improvements**
   - Adjust layout for different screens
   - Test on mobile devices
   - Optimize spacing

## 📊 Code Statistics
- HTML Lines: ~150
- CSS Lines: ~200
- Total Lines: ~350

## 🎯 Difficulty Level
**Beginner** - Perfect for learning CSS basics

## 📌 Key Takeaways
1. Colors and gradients for visual appeal
2. Box shadows for depth perception
3. Padding/margin for proper spacing
4. Transform for hover interactions
5. Responsive design principles

---

**Start with this practical to build strong CSS fundamentals!**
