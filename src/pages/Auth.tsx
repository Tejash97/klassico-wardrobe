
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Layout } from "@/components/Layout";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

type AuthMode = "login" | "register" | "forgot";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const registerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const forgotSchema = z.object({
  email: z.string().email("Please enter a valid email"),
});

const Auth = () => {
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const { signIn, signUp, resetPassword, user } = useAuth();
  const navigate = useNavigate();

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const forgotForm = useForm<z.infer<typeof forgotSchema>>({
    resolver: zodResolver(forgotSchema),
    defaultValues: {
      email: "",
    },
  });

  // Redirect if already logged in
  if (user) {
    navigate("/");
    return null;
  }

  const onLoginSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      await signIn(values.email, values.password);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const onRegisterSubmit = async (values: z.infer<typeof registerSchema>) => {
    try {
      await signUp(values.email, values.password, values.firstName, values.lastName);
      setAuthMode("login");
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  const onForgotSubmit = async (values: z.infer<typeof forgotSchema>) => {
    try {
      await resetPassword(values.email);
    } catch (error) {
      console.error("Forgot password error:", error);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-16 px-4">
        <div className="max-w-md mx-auto bg-card p-8 border rounded-md shadow-sm">
          <div className="mb-8">
            {authMode === "login" && (
              <>
                <h1 className="text-2xl font-medium mb-2">Sign In</h1>
                <p className="text-muted-foreground">
                  Enter your email and password to sign in
                </p>
              </>
            )}
            {authMode === "register" && (
              <>
                <h1 className="text-2xl font-medium mb-2">Create Account</h1>
                <p className="text-muted-foreground">
                  Fill in your details to create a new account
                </p>
              </>
            )}
            {authMode === "forgot" && (
              <>
                <h1 className="text-2xl font-medium mb-2">Reset Password</h1>
                <p className="text-muted-foreground">
                  Enter your email to receive a password reset link
                </p>
              </>
            )}
          </div>

          {authMode === "login" && (
            <Form {...loginForm}>
              <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                <FormField
                  control={loginForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="your.email@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={loginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Enter your password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Sign In
                </Button>
              </form>
            </Form>
          )}

          {authMode === "register" && (
            <Form {...registerForm}>
              <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={registerForm.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="First name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={registerForm.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Last name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={registerForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="your.email@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={registerForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Create a password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Create Account
                </Button>
              </form>
            </Form>
          )}

          {authMode === "forgot" && (
            <Form {...forgotForm}>
              <form onSubmit={forgotForm.handleSubmit(onForgotSubmit)} className="space-y-4">
                <FormField
                  control={forgotForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="your.email@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Send Reset Link
                </Button>
              </form>
            </Form>
          )}

          <div className="mt-6 text-center text-sm">
            {authMode === "login" && (
              <>
                <p className="text-muted-foreground mb-2">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setAuthMode("register")}
                    className="text-primary font-medium hover:underline"
                  >
                    Create one
                  </button>
                </p>
                <button
                  type="button"
                  onClick={() => setAuthMode("forgot")}
                  className="text-primary font-medium hover:underline"
                >
                  Forgot your password?
                </button>
              </>
            )}
            {authMode === "register" && (
              <p className="text-muted-foreground">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setAuthMode("login")}
                  className="text-primary font-medium hover:underline"
                >
                  Sign in
                </button>
              </p>
            )}
            {authMode === "forgot" && (
              <button
                type="button"
                onClick={() => setAuthMode("login")}
                className="text-primary font-medium hover:underline"
              >
                Back to login
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Auth;
