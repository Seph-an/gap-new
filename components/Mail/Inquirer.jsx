import {
  Html,
  Head,
  Preview,
  Tailwind,
  Body,
  Container,
  Section,
  Text,
  Button,
} from "@react-email/components";

import * as React from "react";

export default function GapRecruitmentInquiry({ name, role }) {
  return (
    <Html>
      <Head />
      <Preview>Gap Recruitment - Inquiry Received!</Preview>
      <Tailwind>
        <Body className="bg-green-100 font-sans p-5 lg:p-8 rounded-xl max-w-lg">
          <Container className="bg-white mx-auto rounded-xl shadow-md overflow-hidden">
            {/* Header */}
            <Section className="bg-gray-800 py-5">
              <div className="flex justify-center items-center space-x-2">
                <Img
                  src="https://gaprecruitment.co.ke/logo.png"
                  alt="Gap Recruitment Logo"
                  width="80"
                  height="auto"
                  className="mx-auto"
                />
              </div>
            </Section>

            {/* Main Content */}
            <Section className="text-center  bg-white relative flex flex-col items-center justify-center">
              <div className="flex flex-col items-center justify-center py-6">
                {/* Heading */}
                <Text className="text-2xl font-bold">
                  Thanks for Your Inquiry, {name}
                </Text>

                {/* Checkmark */}
                <Img
                  src="https://gaprecruitment.co.ke/checkmark.png"
                  alt="Check-mark-for-inquiry-received"
                  width="60"
                  height="auto"
                  className="mx-auto my-5"
                />

                {/* Body Text */}
                <Text className="text-base text-gray-800">
                  We’ve <strong>received</strong> your inquiry and will get back
                  to you ASAP!
                </Text>
              </div>

              {role === "jobseeker" && (
                <div className="bg-green-100 flex flex-col items-center justify-center py-6">
                  <Text className="text-base text-gray-800 ">
                    We provide assorted services that help you{" "}
                    <strong>Boost Your Job Search</strong>
                  </Text>

                  {/* CTA Button */}
                  <Button
                    href="#"
                    className="bg-[#51D4D6] text-[#0a0a0a] font-semibold py-2 px-4 rounded text-base mt-6"
                  >
                    Boost Your Job Search &rsaquo;
                  </Button>
                </div>
              )}
            </Section>

            {/* Footer */}
            <Section className="bg-[#FF5C40] text-center py-6">
              <Text className="text-white text-lg font-semibold">
                We appreciate your interest! - G.R.S.L
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
// <a href="https://www.flaticon.com/free-icons/foursquare-check-in" title="foursquare check in icons">Foursquare check in icons created by icon wind - Flaticon</a>
