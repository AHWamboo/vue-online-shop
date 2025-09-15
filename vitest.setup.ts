import { config } from "@vue/test-utils";
import { Quasar } from "quasar";
import { vi } from "vitest";

// Global API mocks - zapobiega prawdziwym zapytaniom API w testach
vi.mock("src/api/supabase", () => ({
  supabase: {
    auth: {
      setSession: vi.fn().mockResolvedValue({ data: {}, error: null }),
      getUser: vi.fn().mockResolvedValue({ data: { user: null }, error: null }),
      getSession: vi
        .fn()
        .mockResolvedValue({ data: { session: null }, error: null }),
    },
    from: vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      update: vi.fn().mockReturnThis(),
      insert: vi.fn().mockReturnThis(),
      delete: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({ data: null, error: null }),
    })),
  },
}));

config.global.mocks = {
  $q: {
    notify: vi.fn(),
    dialog: vi.fn(),
    loading: {
      show: vi.fn(),
      hide: vi.fn(),
    },
    platform: {
      has: {
        touch: false,
        desktop: true,
      },
      is: {
        mobile: false,
        desktop: true,
        cordova: false,
        capacitor: false,
        electron: false,
        chrome: true,
        safari: false,
        firefox: false,
        opera: false,
        win: false,
        mac: true,
        linux: false,
        ios: false,
        android: false,
      },
    },
  },
};

config.global.plugins = [
  [
    Quasar,
    {
      plugins: {},
    },
  ],
];

config.global.stubs = {
  "router-link": {
    template: "<a><slot /></a>",
    props: ["to"],
  },
  RouterLink: {
    template: "<a><slot /></a>",
    props: ["to"],
  },
};
