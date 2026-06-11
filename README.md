# Resume Builder UI

Next.js web application for creating professional, AI-powered resumes.

## Features

- **Multi-step Form**: Clean, intuitive resume creation flow
- **React Hook Form**: Smooth text input experience without re-render issues
- **8 Modern Templates**: Varied styles and color schemes
- **AI-Powered**: Integrates with OpenAI backend for resume generation
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Vercel Ready**: Optimized for deployment

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local`:
```bash
NEXT_PUBLIC_API_URL=http://localhost:3000
```

3. Run development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Form Steps

1. **Personal Info**: Name, email, phone, portfolio, website
2. **Work Experience**: Up to 3 recent positions with responsibilities
3. **Education & Skills**: Educational background, skills, job target
4. **Template**: Choose from 8 professional templates
5. **Review**: Generate and view your AI-powered resume

## Deployment to Vercel

### Option 1: Via Vercel CLI

```bash
npm install -g vercel
vercel
```

### Option 2: Via Vercel Dashboard

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your repository
5. Add environment variable:
   - `NEXT_PUBLIC_API_URL`: Your backend API URL

### Environment Variables

In Vercel dashboard, add:
- `NEXT_PUBLIC_API_URL`: Production API URL (e.g., `https://your-api.vercel.app`)

## Native Wrappers

This web app can be wrapped in native iOS and Android apps using WebView:

### iOS (Swift/WKWebView)
```swift
import WebKit

class ViewController: UIViewController {
    var webView: WKWebView!

    override func viewDidLoad() {
        super.viewDidLoad()
        let url = URL(string: "https://your-resume-builder.vercel.app")!
        webView.load(URLRequest(url: url))
    }
}
```

### Android (Kotlin/WebView)
```kotlin
import android.webkit.WebView

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val webView = WebView(this)
        webView.loadUrl("https://your-resume-builder.vercel.app")
        setContentView(webView)
    }
}
```

## Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Forms**: React Hook Form
- **HTTP Client**: Axios
- **Validation**: Zod

## Project Structure

```
resume-builder-ui/
├── app/
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home page
│   └── globals.css      # Global styles
├── components/
│   ├── ResumeForm.tsx   # Main multi-step form
│   ├── StepIndicator.tsx # Progress indicator
│   └── FormInput.tsx    # Reusable input component
├── lib/
│   ├── api.ts           # API client
│   └── templates.ts     # Template definitions
└── public/              # Static assets
```

## License

ISC
