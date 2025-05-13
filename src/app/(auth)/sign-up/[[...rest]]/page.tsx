"use client";
import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => {
  return (
    <div className="flex justify-center items-center">
      <SignUp 
        path="/sign-up"
        routing="path"
        signInUrl="/sign-in"
        afterSignUpUrl="/dashboard"
        appearance={{
          elements: {
            formButtonPrimary: 
              "bg-primary hover:bg-primary/90 text-primary-foreground",
            footerActionLink: 
              "text-primary hover:text-primary/90",
            card: "bg-background border-border",
            headerTitle: "text-foreground",
            headerSubtitle: "text-muted-foreground",
            socialButtonsBlockButton: 
              "border-border bg-background text-foreground hover:bg-accent hover:text-accent-foreground",
            formFieldLabel: "text-foreground",
            formFieldInput: 
              "bg-background text-foreground border-border",
            footerActionText: "text-muted-foreground",
            identityPreviewText: "text-foreground",
            identityPreviewEditButton: "text-primary hover:text-primary/90",
            alertText: "text-foreground",
            alertIcon: "text-foreground",
            dividerLine: "bg-border",
            dividerText: "text-muted-foreground",
            formFieldWarningText: "text-destructive",
            formFieldSuccessText: "text-green-500",
          },
        }}
      />
          </div>
  );
};

export default SignUpPage;