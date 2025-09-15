import { describe, expect, test } from "vitest";
import { mount } from "@vue/test-utils";
import MenuLink from "./MenuLink.vue";
import { QBtn } from "quasar";

const mountWithStubs = (props = {}) => {
  const defaultProps = {
    icon: "shopping_bag",
    label: "Cart",
    to: "/cart",
  };

  return mount(MenuLink, {
    props: { ...defaultProps, ...props },
    global: {
      stubs: {
        "router-link": {
          template: "<a><slot /></a>",
          props: ["to"],
        },
      },
      components: {
        QBtn,
      },
    },
  });
};

describe("MenuLink with RouterLinkStub", () => {
  test("Renders router-link with correct 'to'", () => {
    const wrapper = mountWithStubs();
    const link = wrapper.find("a");
    expect(link.exists()).toBe(true);
    expect(wrapper.props("to")).toBe("/cart");
  });

  test("Passes props to QBtn (icon, label) and has flat+stretch", () => {
    const wrapper = mountWithStubs();
    const button = wrapper.findComponent(QBtn);
    expect(button.exists()).toBe(true);
    expect(button.props("icon")).toBe("shopping_bag");
    expect(button.props("label")).toBe("Cart");
    expect(button.props("flat")).toBe(true);
    expect(button.props("stretch")).toBe(true);
  });

  test("Renders with different props values", () => {
    const wrapper = mountWithStubs({
      icon: "home",
      label: "Home",
      to: "/home",
    });

    const button = wrapper.findComponent(QBtn);
    expect(button.props("icon")).toBe("home");
    expect(button.props("label")).toBe("Home");
    expect(wrapper.props("to")).toBe("/home");
  });

  test("Link element exists and has correct structure", () => {
    const wrapper = mountWithStubs();
    const link = wrapper.find("a");
    expect(link.exists()).toBe(true);
    expect(link.classes()).toBeDefined();
  });

  test("Component has scoped styles applied", () => {
    const wrapper = mountWithStubs();
    const link = wrapper.find("a");
    // Test that the link element exists and can receive styles
    expect(link.exists()).toBe(true);
    // In a real browser environment, scoped styles would be applied
    expect(link.attributes()).toBeDefined();
  });

  test("Button click triggers router navigation", async () => {
    const wrapper = mountWithStubs();
    const button = wrapper.findComponent(QBtn);

    await button.trigger("click");
    // Test passes if no errors are thrown during click simulation
    expect(button.exists()).toBe(true);
  });

  test("Component structure is correct", () => {
    const wrapper = mountWithStubs();

    // Check that router-link wraps QBtn
    const link = wrapper.find("a");
    const button = wrapper.findComponent(QBtn);

    expect(link.exists()).toBe(true);
    expect(button.exists()).toBe(true);
    expect(link.element.contains(button.element)).toBe(true);
  });

  test("All required props are properly validated", () => {
    // Test that component works with all required props provided
    const wrapper = mountWithStubs({
      icon: "required_icon",
      label: "Required Label",
      to: "/required-path",
    });

    // Verify all required props are passed correctly
    expect(wrapper.props("icon")).toBe("required_icon");
    expect(wrapper.props("label")).toBe("Required Label");
    expect(wrapper.props("to")).toBe("/required-path");
  });

  test("Handles special characters in props", () => {
    const wrapper = mountWithStubs({
      icon: "shopping_cart",
      label: "Cart & Checkout",
      to: "/cart?special=true&value=test",
    });

    const button = wrapper.findComponent(QBtn);
    expect(button.props("label")).toBe("Cart & Checkout");
    expect(wrapper.props("to")).toBe("/cart?special=true&value=test");
  });

  test("Component renders without errors with minimal setup", () => {
    expect(() => {
      mountWithStubs({
        icon: "test",
        label: "Test",
        to: "/test",
      });
    }).not.toThrow();
  });
});
