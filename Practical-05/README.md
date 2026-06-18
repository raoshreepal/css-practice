# Practical 05: Pricing Cards

## 📋 Overview
Three-tier pricing card component demonstrating CSS Grid, transforms, and featuring one card with special elevation and effects.

## 🎯 Learning Objectives
- Master CSS Grid for card layouts
- Implement transform scale and translateY
- Create featured/highlighted cards
- Build professional pricing pages
- Responsive card layouts

## 💻 File Structure
```
Practical-05/
├── index.html     (Pricing cards HTML)
└── style.css      (Grid and card styling)
```

## 🎨 CSS Topics Covered
- **Display Grid**: Card layout system
- **Grid Template Columns**: Responsive columns
- **Transform**: Scale and translate effects
- **Box Shadow**: Card elevation
- **Hover Effects**: Interactive animations
- **Border Radius**: Rounded corners
- **Gradient**: Background styling

## 🌍 Real-World Applications

### **1. SaaS Pricing Pages**
Software subscription pricing tiers
```
- Basic/Starter plan
- Professional/Growth plan (Featured)
- Enterprise/Premium plan
- Feature comparison
- CTA buttons
```

### **2. Hosting Plans**
Web hosting service packages
```
- Shared hosting
- VPS hosting (Popular)
- Dedicated hosting
- Specs comparison
- Sign up buttons
```

### **3. Subscription Services**
Streaming, productivity, or utility services
```
- Free trial tier
- Premium tier (Highlighted)
- Professional tier
- Feature inclusions
- Billing options
```

### **4. Software Licenses**
License packages for software
```
- Individual license
- Team license (Recommended)
- Enterprise license
- Support options
- Renewal pricing
```

### **5. Gym Memberships**
Fitness center pricing
```
- Basic membership
- Premium membership (Featured)
- VIP membership
- Amenities list
- Enrollment CTA
```

## 🔧 Key CSS Features

### **Grid Layout**
```css
.pricing-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  max-width: 1200px;
}
```

### **Featured Card Scaling**
```css
.card.featured {
  transform: scale(1.05);
  box-shadow: 0 8px 30px rgba(0,0,0,0.15);
}

.card {
  transition: all 0.3s;
}

.card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.1);
}
```

### **Price Display**
```css
.price {
  font-size: 2.5rem;
  font-weight: 700;
  color: #667eea;
  margin: 20px 0;
}

.period {
  font-size: 0.9rem;
  color: #999;
}
```

## 📱 Responsive Design

| Breakpoint | Changes |
|-----------|---------|
| Desktop (1024px+) | 3 columns, featured card scaled |
| Tablet (768px) | 2 columns, full-width sizing |
| Mobile (480px) | 1 column, featured card normal size |

## 🚀 How to Use

1. **View Pricing Page**
   - Open `index.html` in browser
   - See 3 pricing cards
   - Notice featured card (middle) is larger
   - Hover to see effects

2. **Customize Plans**
   - Change plan names
   - Update pricing
   - Modify features list
   - Change CTA text

3. **Modify Styling**
   - Change featured card color
   - Adjust card spacing
   - Modify hover animations
   - Update button colors

4. **Add Billing Toggle**
   - Monthly/Yearly switch
   - Update prices dynamically
   - Discount display

## 🎓 Interview Questions

**Q1: How does transform: scale(1.05) work?**
- Enlarges card by 5% (1.05 = 105%)
- Applied to featured/recommended card
- Creates emphasis effect

**Q2: Why use CSS Grid for pricing cards?**
- Responsive without media queries
- Auto-fit/auto-fill for flexibility
- Equal height cards
- Easy gap management

**Q3: What's the difference between transform and layout properties?**
- Transform: Doesn't affect document flow, GPU accelerated
- Layout changes: Affect other elements, causes reflow

## ✏️ Exercises

1. **Add Recommended Badge**
   - Position badge on featured card
   - Style with gradient
   - Add animation

2. **Create Feature List**
   - Checkmark icons for included features
   - X marks for excluded features
   - Styling and spacing

3. **Implement Toggle Button**
   - Monthly/Yearly pricing toggle
   - Update prices with CSS content
   - Show discount percentage

4. **Add Comparison Table**
   - Detailed feature comparison
   - Expandable rows
   - Feature highlights per plan

## 📊 Code Statistics
- HTML Lines: ~250
- CSS Lines: ~300
- Total Lines: ~550

## 🎯 Difficulty Level
**Intermediate** - Grid and transforms

## 📌 Key Takeaways
1. CSS Grid for responsive layouts
2. Transform for emphasis effects
3. Featured card highlighting
4. Hover animations
5. Pricing page best practices

---

**Learn professional pricing design in this practical!**
