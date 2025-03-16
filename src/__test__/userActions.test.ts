import {
  createUserAction,
  fetchUserAction,
  updateUserAction,
} from "../server/services/user/userActions";
import {
  createUserInFirestore,
  getUserFromFirestore,
  updateUserInFirestore,
} from "../server/services/user/userService";

// Mockear las funciones de Firestore
jest.mock("../server/services/user/userService", () => ({
  createUserInFirestore: jest.fn(),
  getUserFromFirestore: jest.fn(),
  updateUserInFirestore: jest.fn(),
}));

describe("User Actions", () => {
  const mockUserData = {
    uid: "mock-uid",
    name: "Test User",
    email: "test@example.com",
    emailVerified: true,
    role: "standard_user",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockUpdates = {
    name: "Updated Name",
    email: "updated@example.com",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createUserAction", () => {
    it("should create a user in Firestore successfully", async () => {
      (createUserInFirestore as jest.Mock).mockResolvedValue(undefined);

      const dispatch = jest.fn();
      const thunk = createUserAction(mockUserData);

      await thunk(dispatch, () => ({}), undefined);

      expect(createUserInFirestore).toHaveBeenCalledWith(mockUserData);
      expect(dispatch).toHaveBeenCalledWith({
        type: "user/create/pending",
        meta: {
          arg: mockUserData,
          requestId: expect.any(String),
          requestStatus: "pending",
        },
        payload: undefined,
      });

      expect(dispatch).toHaveBeenCalledWith({
        type: "user/create/fulfilled",
        meta: {
          arg: mockUserData,
          requestId: expect.any(String),
          requestStatus: "fulfilled",
        },
        payload: mockUserData,
      });
    });

    it("should handle errors when creating a user in Firestore", async () => {
      const mockError = new Error("Failed to create user");
      (createUserInFirestore as jest.Mock).mockRejectedValue(mockError);

      const dispatch = jest.fn();
      const thunk = createUserAction(mockUserData);

      await thunk(dispatch, () => ({}), undefined);

      expect(createUserInFirestore).toHaveBeenCalledWith(mockUserData);
      expect(dispatch).toHaveBeenCalledWith({
        type: "user/create/rejected",
        payload: "Failed to create user",
        meta: {
          arg: mockUserData,
          requestId: expect.any(String),
          requestStatus: "rejected",
          aborted: false,
          condition: false,
          rejectedWithValue: true,
        },
        error: {
          message: "Rejected",
        },
      });
    });
  });

  describe("fetchUserAction", () => {
    it("should fetch a user from Firestore successfully", async () => {
      (getUserFromFirestore as jest.Mock).mockResolvedValue(mockUserData);

      const dispatch = jest.fn();
      const thunk = fetchUserAction(mockUserData.uid);

      await thunk(dispatch, () => ({}), undefined);

      expect(getUserFromFirestore).toHaveBeenCalledWith(mockUserData.uid);
      expect(dispatch).toHaveBeenCalledWith({
        type: "user/fetch/pending",
        meta: {
          arg: mockUserData.uid,
          requestId: expect.any(String),
          requestStatus: "pending",
        },
        payload: undefined,
      });

      expect(dispatch).toHaveBeenCalledWith({
        type: "user/fetch/fulfilled",
        meta: {
          arg: mockUserData.uid,
          requestId: expect.any(String),
          requestStatus: "fulfilled",
        },
        payload: mockUserData,
      });
    });

    it("should handle errors when fetching a user from Firestore", async () => {
      const mockError = new Error("User not found");
      (getUserFromFirestore as jest.Mock).mockRejectedValue(mockError);

      const dispatch = jest.fn();
      const thunk = fetchUserAction(mockUserData.uid);

      await thunk(dispatch, () => ({}), undefined);

      expect(getUserFromFirestore).toHaveBeenCalledWith(mockUserData.uid);
      expect(dispatch).toHaveBeenCalledWith({
        type: "user/fetch/pending",
        meta: {
          arg: mockUserData.uid,
          requestId: expect.any(String),
          requestStatus: "pending",
        },
        payload: undefined,
      });

      expect(dispatch).toHaveBeenCalledWith({
        type: "user/fetch/rejected",
        payload: "User not found",
        meta: {
          arg: mockUserData.uid,
          requestId: expect.any(String),
          requestStatus: "rejected",
          aborted: false,
          condition: false,
          rejectedWithValue: true,
        },
        error: {
          message: "Rejected",
        },
      });
    });
  });

  describe("updateUserAction", () => {
    it("should update a user in Firestore successfully", async () => {
      (updateUserInFirestore as jest.Mock).mockResolvedValue(undefined);

      const dispatch = jest.fn();
      const thunk = updateUserAction({
        uid: mockUserData.uid,
        updates: mockUpdates,
      });

      await thunk(dispatch, () => ({}), undefined);

      expect(updateUserInFirestore).toHaveBeenCalledWith(
        mockUserData.uid,
        mockUpdates
      );
      expect(dispatch).toHaveBeenCalledWith({
        type: "user/update/pending",
        meta: {
          arg: { uid: mockUserData.uid, updates: mockUpdates },
          requestId: expect.any(String),
          requestStatus: "pending",
        },
        payload: undefined,
      });

      expect(dispatch).toHaveBeenCalledWith({
        type: "user/update/fulfilled",
        meta: {
          arg: { uid: mockUserData.uid, updates: mockUpdates },
          requestId: expect.any(String),
          requestStatus: "fulfilled",
        },
        payload: { uid: mockUserData.uid, updates: mockUpdates },
      });
    });

    it("should handle errors when updating a user in Firestore", async () => {
      const mockError = new Error("Failed to update user");
      (updateUserInFirestore as jest.Mock).mockRejectedValue(mockError);

      const dispatch = jest.fn();
      const thunk = updateUserAction({
        uid: mockUserData.uid,
        updates: mockUpdates,
      });

      await thunk(dispatch, () => ({}), undefined);

      expect(updateUserInFirestore).toHaveBeenCalledWith(
        mockUserData.uid,
        mockUpdates
      );
      expect(dispatch).toHaveBeenCalledWith({
        type: "user/update/rejected",
        payload: "Failed to update user",
        meta: {
          arg: { uid: mockUserData.uid, updates: mockUpdates },
          requestId: expect.any(String),
          requestStatus: "rejected",
          aborted: false,
          condition: false,
          rejectedWithValue: true,
        },
        error: {
          message: "Rejected",
        },
      });
    });
  });
});
