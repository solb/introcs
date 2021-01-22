CC := c99
CP := cp

override CFLAGS := -O2 -Wall -Wextra -Wpedantic $(CFLAGS)
override CPPFLAGS := $(CPPFLAGS)
override LDLIBS := -lnode $(LDLIBS)

.PHONY: all
all: rary.node
	tsc

rary.o: private CFLAGS += -fpic
rary.o: private CPPFLAGS += -D_DEFAULT_SOURCE

.PHONY: clean
clean:
	$(RM) *.js *.node *.o *.so

%.node: lib%.so
	$(CP) $< $@

lib%.so: %.o
	$(CC) $(CFLAGS) $(LDFLAGS) -shared -zdefs -ztext $^ -o $@ $(LDLIBS)
