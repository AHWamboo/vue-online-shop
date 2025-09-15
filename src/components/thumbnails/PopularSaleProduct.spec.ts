import { describe, expect, test } from "vitest";
import { mount } from "@vue/test-utils";
import PopularSaleProduct from "./PopularSaleProduct.vue";
import { QImg } from "quasar";

const mountWithStubs = (props = {}) => {
  return mount(PopularSaleProduct, {
    props: { ...props },
    global: {
      components: {
        QImg,
      },
    },
  });
};

describe("PopularSaleProduct component with qImg", () => {
  test("Renders div with correct classes", () => {
    const wrapper = mountWithStubs();
    const div = wrapper.find("div");
    const divClasses = ["col-2", "popular"];

    expect(div.exists()).toBe(true);
    expect(div.classes()).toEqual(divClasses);
  });

  test("Renders paragraph with correct classes", () => {
    const wrapper = mountWithStubs();
    const p = wrapper.find("p");
    const pClasses = ["popular-picture-p"];

    expect(p.exists()).toBe(true);
    expect(p.classes()).toEqual(pClasses);
  });

  test("Renders QImg with correct classes and src prop", () => {
    const expectedSrc =
      "https://pathetic-word.demo.prestashop.com/5-home_default/today-is-a-good-day-framed-poster.jpg";

    const wrapper = mountWithStubs();
    const qImg = wrapper.findComponent(QImg);

    expect(qImg.exists()).toBe(true);
    expect(qImg.classes()).toContain("popular-picture");
    expect(qImg.props("src")).toBe(expectedSrc);
  });
});
