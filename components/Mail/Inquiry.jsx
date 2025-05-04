//components/Mail/Inquiry.jsx
import {
  Html,
  Head,
  Tailwind,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Img,
  Preview,
} from "@react-email/components";
import * as React from "react";

export default function Inquiry({ name, email, phone, message }) {
  const year = new Date().getFullYear();

  return (
    <Html>
      <Tailwind>
        <Head />
        <Preview>New Inquiry from Website</Preview>
        <Body className="bg-gray-100 font-sans p-5">
          <Container className="bg-white shadow rounded-lg">
            <Section className="text-center py-4 bg-gray-800">
              <Img
                src="http://161.35.16.36/logo.png"
                alt="Gap Recruitment"
                width="100"
                className="mx-auto"
              />
            </Section>
            <Section className="p-6">
              <Heading className="text-xl font-bold text-gray-800">
                Inquiry Details
              </Heading>
              <Text>
                <strong>Name:</strong> {name}
              </Text>
              <Text>
                <strong>Email:</strong> {email}
              </Text>
              <Text>
                <strong>Phone:</strong> {phone}
              </Text>
              <Text>
                <strong>Message:</strong> {message}
              </Text>
            </Section>
            <Section className="text-center py-4 bg-gray-800">
              <Text className="text-xs text-[#51D4D6]">
                &copy; {year} G.R.S.L. All rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
