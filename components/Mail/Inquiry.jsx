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
        <Body className="bg-green-100 font-sans rounded-xl max-w-lg">
          <Container className="bg-white mx-auto rounded-xl shadow-md overflow-hidden">
            <Section className="bg-gray-800 py-3">
              <Img
                src="https://gaprecruitment.co.ke/logo.png"
                alt="Gap Recruitment"
                width="100"
                className="mx-auto py-4"
              />
            </Section>
            <Section className="text-center  bg-white relative flex flex-col items-center justify-center">
		<div className="flex flex-col justify-center py-4 px-6">
		 <Heading className="text-lg font-bold text-gray-800">
                  Inquiry details
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
		</div>
            </Section>
            <Section className="text-center py-6 bg-gray-800">
              <Text className="text-sm text-[#51D4D6]">
                &copy; {year} G.R.S.L. All rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
