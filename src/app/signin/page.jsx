"use client";

import { authClient } from "@/lib/auth-client";
import {
  Button,
  Description,
  FieldError,
  Fieldset,
  Form,
  Input,
  Label,
  Surface,
  TextField,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function SignInPage() {
  const router = useRouter();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const email = formData.get("email")?.toString().trim();
    const password = formData.get("password")?.toString();

    if (!email || !password) {
      setError("Please enter your email and password.");
      setLoading(false);
      return;
    }

    const { data, error } = await authClient.signIn.email({
      email,
      password,
    });

    if (error) {
      console.error("Signin error:", error);

      setError(error.message || "Invalid email or password.");
      setLoading(false);
      return;
    }

    console.log("Signin successful:", data);

    router.push("/");
    router.refresh();
  };

  return (
    <div className="mx-auto mt-5 flex max-w-2xl items-center justify-center rounded-3xl border bg-surface p-6">
      <Surface className="w-full">
        <Form onSubmit={onSubmit}>
          <Fieldset className="w-full">
            <Fieldset.Legend>Sign In</Fieldset.Legend>

            <Description>
              Welcome back to Fable
            </Description>

            <Fieldset.Group>
              <TextField isRequired name="email" type="email">
                <Label>Email</Label>

                <Input
                  placeholder="john@example.com"
                  variant="secondary"
                />

                <FieldError />
              </TextField>

              <TextField isRequired name="password" type="password">
                <Label>Password</Label>

                <Input
                  placeholder="Password"
                  variant="secondary"
                />

                <FieldError />
              </TextField>
            </Fieldset.Group>

            {error && (
              <p className="mt-2 text-sm text-danger">
                {error}
              </p>
            )}

            <Button
              type="submit"
              className="w-full"
              isDisabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </Fieldset>
        </Form>
      </Surface>
    </div>
  );
}

