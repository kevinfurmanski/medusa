import { DALUtils, generateEntityId } from "@medusajs/utils"

import {
  BeforeCreate,
  Entity,
  Filter,
  Index,
  OnInit,
  OptionalProps,
  PrimaryKey,
  Property,
} from "@mikro-orm/core"
import { DAL } from "@medusajs/types"

type ShippingProfileOptionalProps = DAL.EntityDateColumns

@Entity()
@Filter(DALUtils.mikroOrmSoftDeletableFilterOptions)
export default class ShippingProfile {
  [OptionalProps]?: ShippingProfileOptionalProps

  @PrimaryKey({ columnType: "text" })
  id: string

  shipping_options // TODO: configure relationship

  @Property({
    onCreate: () => new Date(),
    columnType: "timestamptz",
    defaultRaw: "now()",
  })
  created_at: Date

  @Property({
    onCreate: () => new Date(),
    onUpdate: () => new Date(),
    columnType: "timestamptz",
    defaultRaw: "now()",
  })
  updated_at: Date

  @Index({ name: "IDX_shipping_profile_deleted_at" })
  @Property({ columnType: "timestamptz", nullable: true })
  deleted_at: Date | null = null

  @BeforeCreate()
  onCreate() {
    this.id = generateEntityId(this.id, "shpro")
  }

  @OnInit()
  onInit() {
    this.id = generateEntityId(this.id, "shpro")
  }
}
