import {
  Html,
  Head,
  Preview,
  Tailwind,
  Body,
  Img,
  Container,
  Section,
  Text,
  Button,
} from "@react-email/components";

import * as React from "react";

export default function GapRecruitmentInquiry({ name, role }) {
  return (
    <Html>
      <Tailwind>
        <Head />
        <Preview>Gap Recruitment - Inquiry Received!</Preview>
        <Body className="bg-green-100 font-sans rounded-xl max-w-lg">
          <Container className="bg-white mx-auto rounded-xl shadow-md overflow-hidden">
            {/* Header */}
            <Section className="bg-gray-800 py-3">
              <div className="flex justify-center items-center space-x-2">
                <Img
                  src="http://161.35.16.36/logo.png"
                  alt="Gap Recruitment Logo"
                  width="100"
                  height="auto"
                  className="mx-auto"
                />
              </div>
            </Section>

            {/* Main Content */}
            <Section className="text-center  bg-white relative flex flex-col items-center justify-center">
              <div className="flex flex-col items-center justify-center py-4">
                {/* Heading */}
                <Text className="text-2xl font-bold text-[#1E2939]">
                  Thanks for your inquiry,{" "}
                  <strong className="text-[#7d51d6]">{name}</strong>
                </Text>

                {/* Checkmark */}
                <Img
                  src="http://161.35.16.36/checkmark.png"
                  alt="Check-mark-for-inquiry-received"
                  width="100"
                  height="auto"
                  className="mx-auto my-2"
                />

                {/* Body Text 22c55e */}
                <Text className="text-base text-[#1E2939]">
                  We’ve <strong className="text-[#7d51d6]">received</strong>{" "}
                  your inquiry and will get back to you ASAP!
                </Text>
              </div>

              {role === "Jobseeker" && (
                <div className="bg-green-100 flex flex-col items-center justify-center py-3">
                  <Text className="text-sm text-gray-800 ">
                    We also provide assorted services that help you{" "}
                    <strong>Boost Your Job Search</strong>
                  </Text>

                  {/* CTA Button */}
                  <Button
                    href="https://www.cvitup.com"
                    className="bg-[#7d51d6] text-white font-medium p-4 shadow-md rounded-md text-base my-3"
                  >
                    Explore Our Services
                  </Button>
                </div>
              )}
            </Section>

            {/* Footer */}
            <Section className="bg-[#1E2939] text-center py-1">
              <Text className="text-white/90 text-base leading-1.5 font-semibold">
                We Appreciate Your Interest!
              </Text>
              <Text className="text-[#51D4D6] text-sm">
                &copy; {new Date().getFullYear()} G.R.S.L.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
// <a href="https://www.flaticon.com/free-icons/foursquare-check-in" title="foursquare check in icons">Foursquare check in icons created by icon wind - Flaticon</a>
