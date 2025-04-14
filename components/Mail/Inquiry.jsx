import {
  Html,
  Head,
  Preview,
  Tailwind,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Img,
} from "@react-email/components";
import * as React from "react";

export default function InquiryConfirmation({ name, email, phone, message }) {
  const currentYear = new Date().getFullYear();

  return (
    <Html>
      <Head />
      <Preview>Inquiry Received from Contact Form</Preview>
      <Tailwind>
        <Body className="bg-gray-100 font-sans p-5 rounded-lg max-w-lg mx-auto">
          <Container className="mx-auto bg-white shadow-md rounded-lg overflow-hidden">
            {/* Logo */}
            <Section className="bg-gray-800 text-center py-6">
              <Img
                src="https://gaprecruitment.co.ke/logo.png"
                alt="Gap Recruitment Logo"
                width="80"
                height="auto"
                className="mx-auto"
              />
            </Section>

            {/* Header */}
            <Section className="text-center p-6">
              <Heading as="h2" className="text-2xl font-bold text-gray-800 m-0">
                Inquiry Details
              </Heading>
            </Section>

            {/* Inquiry Details */}
            <Section className="p-6">
              <div className="text-start text-sm leading-6 space-y-3 text-gray-800">
                <div>
                  <Text className="font-semibold inline">Name:</Text> {name}
                </div>
                <div>
                  <Text className="font-semibold inline">Email:</Text> {email}
                </div>
                <div>
                  <Text className="font-semibold inline">Phone:</Text> {phone}
                </div>
                <div>
                  <Text className="font-semibold inline">Message:</Text>{" "}
                  {message}
                </div>
              </div>
            </Section>

            {/* Footer */}
            <Section className="bg-gray-800 text-center py-4">
              <Text className="text-xs text-[#51D4D6] m-0">
                &copy; {currentYear} G.R.S.L. All rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
