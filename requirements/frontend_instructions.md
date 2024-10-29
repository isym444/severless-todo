# Project overview
Use this guide to build a todo-app where users can create, view and delete their todos

# Feature requirements
- We will use Next.js, Shadcn, Lucide, Supabase and Clerk
- Create a form where users put in their todo task and clicking a button adds the todo task to a list of todos below
- Have a nice UI where the users' todos are displayed
- When hovering over each todo, that todo should be highlighted subtly
- If you click any todo, the todo should change to done and change its formatting to strikethrough
- When a todo is set to done, it should drop to the bottom of the list of todos

# Relevant docs

# Current file structure
TODO-APP
├── .next
├── app
│   ├── fonts
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── node_modules
├── public
├── requirements
│   └── frontend_instructions.md
├── .eslintrc.json
├── .gitignore
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── README.md
├── tailwind.config.ts
├── todo-app
└── tsconfig.json

# Rules
- All new components should go in /components and be named like example-component.tsxu unless otherwise specified
- All new pages go in /app